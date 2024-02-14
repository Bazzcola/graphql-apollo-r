import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { NewsItem } from '../NewsItem/NewsItem';
import { useQuery } from '@apollo/client';
import { GET_ARTICLE_LIST } from '../../apolloQueries/articleList';
import { NewsListInterface } from '../../interfaces/newsListInterface';
import arrowUp from '../../img/arrow-128-xxl.png';

const NewsInfiniteList = styled.div`
    background:#FFFF;
    border-radius:8px;
    padding:24px 24px 24px 24px;
    min-height: 100vh;
    overflow-y: auto;
`

const NewsHeader = styled.div`
    display:flex;
    position:relative;
    justify-content:space-between;
    align-items:center;
    margin-bottom:24px;
`

const NewsHeaderDay = styled.div`
    color: rgb(15, 23, 42);
    position: relative;
    font-weight: 700;
    text-align: left;
    font-size: 28px;
`

const NewsHeaderSelector = styled.div`
    font-weight: 500;
    font-size: 16px;
    color: rgb(128, 128, 128);
    margin-left: 4px;
`

const ScrollTopButton = styled.div<{$show: string}>`
  display: ${props => props.$show};
  align-items:center;
  justify-content:center;
  background-color: rgb(210, 210, 210);
  width: 30px;
  height: 30px;
  padding: 0px;
  margin: 0px;
  outline: none;
  border-radius: 5px;
  position:fixed;
  bottom:100px;
  margin-left:-70px;
  cursor:pointer;
`
const IconArrowUp = styled.img`
  width:17px;
  height:20px;
`

const ScrollTopBox = styled.div`
  background-color:none;
  position: block;
  width:1px;
  height:1px;
`

const ScrollTop = styled.div`
  position:relative;
`

export const NewsList = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_ARTICLE_LIST);
  const [newsList, setNewsList] = useState<NewsListInterface[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [showButton, setShowButton] = useState<boolean>(false);
  const prevScrollY = useRef<number>(0);

  useEffect(() => {
    if (!data) {
      return
    }

    setNewsList(data.contents);
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - prevScrollY.current) > 100) {
        setShowButton(scrollY > 100);

        prevScrollY.current = scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollPage = async() => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 1100) {
      
      const lastDate = newsList.at(-1);
      
      if (hasMore && !loading) {
 
        const dataFetch = await fetchMore({
          variables: {
            take: 30,
            postedDateTo: Number(lastDate?.dates.postedTs),
          },
        });

        
        const newPosts = dataFetch.data.contents;

        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setNewsList([...newsList, ...newPosts]);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollPage);

    return () => {
      window.removeEventListener('scroll', handleScrollPage);
    };
  }, [handleScrollPage]);

  if(error) {
    return <div>Error...</div>
  }

  if(loading) {
    return <div>Loading...</div>
  }

  const onScrollUp = () => {
    window.scrollTo(0, 0);
  }

  return (
    <NewsInfiniteList>
      <NewsHeader>
        <NewsHeaderDay>
          Сегодня

          <ScrollTopBox>
            <ScrollTop>
              <ScrollTopButton $show={showButton ? 'flex' : 'none'} onClick={() => onScrollUp()}>
                <IconArrowUp src={arrowUp} alt='arrow' />
              </ScrollTopButton>
            </ScrollTop>
          </ScrollTopBox>

        </NewsHeaderDay>

        <NewsHeaderSelector>
          Источники
        </NewsHeaderSelector>

      </NewsHeader>

      {newsList.length > 0 && newsList.map((item) =>
        <NewsItem
          data={item}
          key={item.id}
        />
      )}
      
    </NewsInfiniteList>
  )
}