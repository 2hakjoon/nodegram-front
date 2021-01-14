import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
    display : flex;
    flex-direction : column;
    justify-content : space-between;
    align-items: center;
    font-weight : 600;
    margin: 50px 0px;
`;

const List = styled.ul`
    display: flex;
    margin-bottom : 20px;
`;

const ListItem = styled.li`
    &:not(:last-child){
        margin-right:16px;
    }
`;

const Link = styled.a`
    color: ${props => props.theme.darkBlueColor};
    font-size : 12px;
`;

const Copyright = styled.span`
    color: ${props => props.theme.darkGreyColor};
`;

export default () => (
    <Footer>
        <List>
            <ListItem>
                <Link href = "#">소개</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">블로그</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">채용 정보</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">도움말</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">API</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">개인정보처리방침</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">약관</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">인기 계정</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">해시태그</Link>
            </ListItem>
            <ListItem>
                <Link href = "#">위치</Link>
            </ListItem>
        </List>
            <Copyright>
                <>© {new Date().getFullYear()} Instagram from Facebook</>
            </Copyright>
    </Footer>
);

