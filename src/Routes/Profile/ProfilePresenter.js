import { useMutation, useQuery } from "react-apollo-hooks";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import Button from "../../Components/Button";
import FatText from "../../Components/FatText";
import FollowButtonContainer from "../../Components/FollowButton";
import Loader from "../../Components/Loader";
import SquarePost from "../../Components/SquarePost";
import { GET_USER, LOG_OUT } from "./ProfileContainer";

const Wrapper = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    min-height: 30vh;
`;

const Header = styled.header`
    padding-top:100px;
    display : flex;
    align-items:center;
    justify-content:center;
    justify-content : space-around;
    width:80%;
    margin:0 auto;
    margin-bottom:40px;
`;

const HeaderColumn = styled.div`

`;

const UsernameRow = styled.div`
    display : flex;
    align-items: center;
`;

const Username = styled.span`
    font-size: 26px;
    margin-bottom : 10px;
    display:block;
`;

const Counts = styled.ul`
    display:flex;
`;

const Count = styled.li`
    font-size:15px;
    &:not(:last-child){
        margin-right:10px;
    }
`;

const Posts = styled.div`
    display : grid;
    grid-template-columns: repeat(4, 200px);
    grid-template-rows : 200px;
    grid-auto-rows:200px;
`;




export default withRouter(({match:{params:{username}}}) => {
    const { data, loading } = useQuery(GET_USER, {variables:{userName : username}})
    const [logUserOut] = useMutation(LOG_OUT);
    if (loading){
        return <Wrapper>
             <Loader/>
        </Wrapper>
    }
    else{
        console.log(data);
        const { seeUser : {
            id,
            avatar,
            userName,
            fullName,
            isFollowing,
            isSelf,
            bio,
            followingCount,
            followersCount,
            postsCount,
            posts
            }
        }= data;
        return <>
            <Helmet>
                <title>
                    {username} | nodegram
                </title>
            </Helmet>
        
            <Header>
                <HeaderColumn>
                    <Avatar size="lg" url={avatar}/>
                </HeaderColumn>
                <HeaderColumn>
                    <span>
                        <Username>{userName}</Username>{" "}
                        {isSelf ? <Button onClick = {logUserOut} text = "Log Out"/>: <FollowButtonContainer id = {id} isFollowing={isFollowing} />}
                    </span>
                    <Counts>
                        <Count><FatText text = {postsCount} /> posts</Count>
                        <Count><FatText text = {followersCount} /> followers</Count>
                        <Count><FatText text = {followingCount} /> followings</Count>
                    </Counts>
                </HeaderColumn>
            </Header>
            <Posts>
                {posts && posts.map(post => (<SquarePost
                        key = {post.id}
                        likeCount={post.likeCount}
                        commentCount={post.commentCount}
                        file={post.files[0]}
                    />))}
            </Posts>
        </>
    }
})