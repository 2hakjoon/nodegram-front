import React from "react"; 
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";
import { Link } from "react-router-dom";
import FollowButtonContainer from "./FollowButton/index";

const Card = styled.div`
    ${props => props.theme.whiteBox}
    flex-direction:column;
    padding : 20px;
    height:100%;
    align-items:center;
    &>:first-child{
        margin : 0 auto;
    }
`;


const ELink = styled(Link)`
    color: inherit;
    display:block;
    height:30%;
    line-height : 300%;
    vertical-align: middle;
`;

const UserCard = ({id, userName, isFollowing, url, isSelf}) => (
    <Card>
        <Avatar url = {url} size = "md"/>
        <ELink to = {`/${userName}`}> <FatText text={userName}/> </ELink>
        {!isSelf && <FollowButtonContainer id={id} isFollowing = {isFollowing}/>}
    </Card>
);

UserCard.propTypes = {
    id:PropTypes.string.isRequired,
    username:PropTypes.string.isRequired,
    isFollowing:PropTypes.bool.isRequired,
    url:PropTypes.string.isRequired,
    isSelf:PropTypes.bool.isRequired,
}

export default UserCard;