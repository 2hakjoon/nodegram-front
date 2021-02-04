import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import ProfilePresenter from "./ProfilePresenter";

export const GET_USER = gql`
    query seeUser($userName: String!){
        seeUser(userName:$userName){
            id
            avatar
            userName
            fullName
            isFollowing
            isSelf
            bio
            followingCount
            followersCount
            postsCount
            posts{
                id
                files{
                    url
                }
                likeCount
                commentCount
            }
        }
    }
`;

export const LOG_OUT = gql`
    mutation logUserOut($token: String!){
        logUserOut(token: $token) @client
    }
`
export default ProfilePresenter;