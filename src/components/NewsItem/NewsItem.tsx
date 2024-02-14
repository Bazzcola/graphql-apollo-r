import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { NewsListInterface } from '../../interfaces/newsListInterface';

const Wrapper = styled.div`
    width:100%;
    height:100%;
`
const ArticleBlock = styled.div<{$isViewed: string}>`
    display:flex;
    width:fit-content;
    margin-bottom:24px;
    opacity: ${props => props.$isViewed};
`

const ArticleImage = styled.img`
    width:240px;
    background:black;
    border-radius:4px;
    cursor:pointer;
`

const ArticleTextBlock = styled.div`
    display:block;
    max-width:680px;
    margin-left:16px;

    a {
        text-decoration: none;
    }
`

const ArticleTextTitle = styled.div`
    div {
        margin:0px;
        font-size:24px;
        line-height:26px;
        font-weight: 500;
        color:#0f172a;
        cursor:pointer;
        margin-bottom:10px;
    
        &:hover {
            color:red;
        }
    }
`

const ArticleTextDescription = styled.div`
    display:block;
    font-size:16px;
    line-height:20px;
    color:#0f172a;
    font-weight:400;
    margin-bottom:6px;
    height:41px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media(max-width:850px) {
        display:none;
    }
`

const ArticleLogoDate = styled.div`
    display:flex;
    align-items: center;
`

const ArticleLogo = styled.img`
    width:16px;
    height:16px;
    border-radius:2px;
    margin-right:8px;
`

const ArcticleDate = styled.div`
    display: block;
    color:#808080;
    font-size:14px;
`

const LinkNavigation = styled.div`
    display:block;
`

interface NewsItemInterface {
    data:NewsListInterface
}

export const NewsItem:React.FC<NewsItemInterface> = ({ data }) => {
    const navigate = useNavigate();
    const [viewedArrayList, setViewedArrayList] = useState<string[]>([]);

    useEffect(() => {
        const viewedArrayList = localStorage.getItem('readed_articles');

        const retrievedArray = JSON.parse(viewedArrayList ?? "[]");

        setViewedArrayList([...retrievedArray]);
    },[]);

    const toArticleReadPage = (postId:string) => {
        const scrollY = window.scrollY;

        const retrievedArrayString = localStorage.getItem('readed_articles');

        let retrievedArray = JSON.parse(retrievedArrayString ?? "[]");
    
        retrievedArray.push(postId);

        localStorage.setItem('readed_articles', JSON.stringify(retrievedArray));

        localStorage.setItem('saveScrollPosition', scrollY.toString());

        localStorage.setItem('last_page', 'article-page')

        navigate(`/article/${data.url}`, { state: { postId: postId } });
    }

    useEffect(() => {
        const savedScrollY = localStorage.getItem('saveScrollPosition');
        const lastPage = localStorage.getItem('last_page');
        
        if (savedScrollY !== null && lastPage === 'article-page') {
            window.scrollTo(0, parseInt(savedScrollY, 10));

            setTimeout(() => {
                localStorage.setItem('saveScrollPosition', '0');
                localStorage.setItem('last_page','');
            },500);
        }
    },[]);

    return (
        <Wrapper>

            <ArticleBlock $isViewed={viewedArrayList.includes(data.id) ? '0.5' : '1'}>
                <LinkNavigation onClick={() => toArticleReadPage(data.id)}>
                    <ArticleImage src={`https://i.simpalsmedia.com/point.md/news/370x194/${data.thumbnail}`} alt='article-img' />
                </LinkNavigation>

                <ArticleTextBlock>
                    <LinkNavigation onClick={() => toArticleReadPage(data.id)}>
                        <ArticleTextTitle>
                            <div dangerouslySetInnerHTML={{__html: data.title.short}}/>
                        </ArticleTextTitle>
                    </LinkNavigation>

                    <ArticleTextDescription>
                        {data.description.intro}
                    </ArticleTextDescription>

                    <ArticleLogoDate>
                        <ArticleLogo src={`https://i.simpalsmedia.com/point.md/logo/${data.parents[1].attachment}`} alt="article-logo" />

                        <ArcticleDate>
                           {data.dates.posted}
                        </ArcticleDate>
                    </ArticleLogoDate>
                </ArticleTextBlock>
            </ArticleBlock>

        </Wrapper>
    )
}