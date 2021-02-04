import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
    padding-top : 100px;
    height: 50vh;
    text-align:center;
`;

const Section = styled.div`
    display: grid;
    grid-gap:25px;
    grid-template-columns : repeat(4, 1fr);
    grid-template-rows:repeat(3, 180px);
`;

const PostSection = styled(Section)`
    grid-template-columns: repeat(4, 200px);
    grid-template-rows : 200px;
    grid-auto-rows:200px;
`

const SearchPresenter = ({ searchTerm, loading, data }) => {
    if(searchTerm === undefined){
        return <Wrapper><FatText text="Search for something" /></Wrapper>
    }
    else if(loading === true){
        return <Wrapper><Loader/></Wrapper>
    }
    else if(data && data.searchUser || data.searchPost){
        console.log(data)
        return (
        <Wrapper>
            <Section>
                {data.searchUser.length === 0 ? <FatText text = "No users found"/> : (data.searchUser.map(user => (
                <UserCard
                key={user.id}
                userName={user.userName} 
                isFollowing={user.isFollowing} 
                url={user.avatar} 
                isSelf={user.isSelf}
                id={user.id}
                />))
                )}
            </Section>
            <PostSection>
                {data.searchPost.length === 0 ? (<FatText text="No Posts Founded"/>) : (data.searchPost.map(post => (
                    <SquarePost
                        key = {post.id}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount}
                        file={post.files[0]}
                    />
                    ))
                )}
            </PostSection>
        </Wrapper>
        );
    }

}

SearchPresenter.propTypes = {
    searchTerm: PropTypes.string,
    loading : PropTypes.bool
}

export default SearchPresenter;