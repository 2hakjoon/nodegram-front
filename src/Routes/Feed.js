import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

const FEED_QUERY = gql`
{
    seeFeed{
        id
        location
        caption
        user {
            id
            avatar
            userName
        }
        files{
            id
            url
        }
        likeCount
        isLiked
        comments{
            id
            text
            user{
                id
                userName
            }
        }
        createdAt
    }
}
`;

const Wrapper = styled.div`
    padding-top:100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height:80vh;
`;

export default () => {
    const {data, loading} = useQuery(FEED_QUERY);
    return <Wrapper>
        <Helmet>
            <title>Feed | Nodegram</title>
        </Helmet>
        {loading && <Loader/>}
        {!loading &&
         data && 
         data.seeFeed && 
         data.seeFeed.map(post => (
         <Post 
            key={post.id} 
            id={post.id} 
            user={post.user} 
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt = {post.createdAt}
            caption = {post.caption}
            location = {post.location}
        />))}
        </Wrapper>
}