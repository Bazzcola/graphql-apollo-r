import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ArticleReadInterface } from '../../interfaces/articleReadInterface';
import { Header as HeaderWrapper } from '../../components/Header/Header';
import { GET_ARTICLE_ITEM } from '../../apolloQueries/articleItem';
import viewEye from '../../img/eye.svg';

const ArticleBlock = styled.div`
    background:#FFFF;
    border-radius:8px;
    padding:24px 24px 24px 24px;
`
const ArticleHeader = styled.div`
    display:flex;
    align-items: center;

    a {
        color: rgb(51, 121, 191);
        font-size: 16px;
        font-weight: 400;
        margin-right: 12px;
        white-space: nowrap;
        text-transform: capitalize;
        text-decoration:none;
    }
`

const ArticleLogo = styled.img`
    width:16px;
    height:16px;
    border-radius:2px;
    margin-right:8px;
`

const ArcticleDate = styled.div`
    display: flex;
    align-items:center;
    color:#808080;
    font-size:14px;

    img {
        margin-left:16px;
        margin-right:5px;
    }
`

const ArticleTitle = styled.div`
    div {
        color: rgb(15, 23, 42);
        font-size: 40px;
        letter-spacing: -1px;
        line-height: 44px;
        font-weight: 700;
        margin: 12px 0px 0px;
    }
`

const ArticleDescription = styled.div`
    color: rgb(15, 23, 42);
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    margin-top: 16px;
    margin-bottom: 24px;
    line-height: 28px;
`

const ArticleImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
`

const ArticleImageDescription = styled.p`
    width: 100%;
    color: rgb(128, 128, 128);
    font-size: 14px;
    letter-spacing: 0px;
    line-height: 16px;
    padding-top: 8px;
    word-break: break-word;
    margin-bottom: 24px;
`

const Source = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:33px;

    p{
        color: rgb(128, 128, 128);
        font-size: 16px;
        line-height: 20px;
        margin:0px 8px 0px 0px;
    }

    a{
        color: rgb(51, 121, 191);
        font-size: 16px;
        font-weight: 400;
        white-space: nowrap;
        text-transform: capitalize;
        text-decoration: none;
    }
`

const DiscusionButton = styled.div`
    height: 40px;
    border-radius: 5px;
    font-size: 16px;
    padding: 0px 20px;
    margin-bottom:40px;
    border: 1px solid rgb(169, 191, 115);
    font-weight: 500;
    background-color: rgb(255, 255, 255);
    color: rgb(169, 191, 115);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
`

const DescriptionIntro = styled.div`
    color: rgb(15, 23, 42);
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0px;
    margin-top: 16px;
    margin-bottom: 24px;
    line-height: 28px;
`

const BackendText = styled.div`
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px; 
    }
`

export const ArticleRead = () => {
    const params = useLocation();
    const { loading, error, data, refetch } = useQuery(GET_ARTICLE_ITEM, { variables: { id: params.state.postId } });
    const [postId, setPostId] = useState<string | undefined>(undefined);
    const [post, setPost] = useState<ArticleReadInterface>();
    
    useEffect(() => {
        if(params.state.postId) {
            setPostId(params.state.postId);

            window.scrollTo(0, 0);
        }
    },[params]);

    useEffect(() => {
        if(postId) {
            refetch({id: postId});
        }
    },[postId]);

    useEffect(() => {
        if(data) {
            setPost(data);
        }
    },[data]);

    if(error) {
        return <div>Error...</div>
    }

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <HeaderWrapper>
            {post?.content && <ArticleBlock>
                <ArticleHeader>
                    <ArticleLogo src={`https://i.simpalsmedia.com/point.md/logo/${post.content.parents[1].attachment}`} alt="" />

                    <a href="https://www.dw.com">Dw</a>

                    <ArcticleDate>
                        {post.content.dates.postedSeparator}, {post.content.dates.posted} <img src={viewEye} alt='view-eye' /> {post.content.counters.view}
                    </ArcticleDate>
                </ArticleHeader>

                <ArticleTitle>
                    <div dangerouslySetInnerHTML={{__html:post.content.title.long}}/>
                </ArticleTitle>

                <ArticleDescription>
                    <DescriptionIntro>
                        {post.content.description.intro}
                    </DescriptionIntro>

                    <ArticleImage src={`https://i.simpalsmedia.com/point.md/news/900x900/${post.content.thumbnail}`} alt="image" />

                    <ArticleImageDescription>
                        {post.content.description.thumbnail}
                    </ArticleImageDescription>

                    <BackendText>
                        <div dangerouslySetInnerHTML={{__html: post.content.description.long}}/>
                    </BackendText>

                </ArticleDescription>

                <Source>
                    <p>Источник</p>

                    <ArticleLogo src={`https://i.simpalsmedia.com/point.md/logo/${post.content.parents[1].attachment}`} alt="" />

                    <a href="https://www.dw.com">Dw</a>
                </Source>

                <DiscusionButton>Обсуждение {post.content.counters.comment}</DiscusionButton>
            </ArticleBlock>}
        </HeaderWrapper>    
    )
}