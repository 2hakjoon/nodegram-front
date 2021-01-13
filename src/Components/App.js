import React from "react";
import {gql} from "apollo-boost";
import GlobalStyles from "../Styles/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import Theme from "../Styles/Theme";
import AppRouter from "./Router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import { useQuery } from "react-apollo-hooks";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  width : 100%;
  margin : 0 auto;
  max-width : 935px;
`

export default () => {

  const{ data: {isLoggedIn} } = useQuery(QUERY);

  return(
    <ThemeProvider theme = {Theme}>
    <Wrapper>
      <GlobalStyles/>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <Footer/>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
    </Wrapper>
  </ThemeProvider>
  )
};