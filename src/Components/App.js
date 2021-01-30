import React from "react";
import {gql} from "apollo-boost";
import GlobalStyles from "../Styles/GlobalStyles";
import styled, {ThemeProvider} from "styled-components";
import Theme from "../Styles/Theme";
import AppRouter from "./Routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./Footer";
import { useQuery } from "react-apollo-hooks";
import Header from "./Header";
import { HashRouter as Router } from "react-router-dom";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  width : 100%;
  margin : 0 auto;
  max-width : ${props => props.theme.maxWidth};
`

export default () => {

  const{ data: {isLoggedIn} } = useQuery(QUERY);

  return(
    <ThemeProvider theme = {Theme}>
    <GlobalStyles/>
    <Router>
      <>
        {isLoggedIn && <Header />}
        <Wrapper>
          <AppRouter isLoggedIn={isLoggedIn}/>
          <Footer/>
        </Wrapper>
      </>
    </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT}/>
    </ThemeProvider>
  )
};