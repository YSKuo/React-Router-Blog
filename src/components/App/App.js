import React, { useEffect } from "react";
import SignUpPage from "../../pages/SignUpPage";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import AboutPage from "../../pages/AboutPage";
import PostPage from "../../pages/PostPage";
import CreateNewPostPage from "../../pages/CreateNewPostPage";
import EditPostPage from "../../pages/EditPostPage";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../redux/reducers/userReducer";
import { getAuthToken } from "../../utils";
import styled from "styled-components";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 登入狀態處理
    if (getAuthToken()) {
      dispatch(getMe());
    }
  }, []);

  return (
    <Root>
      <Router>
        <Header>Header</Header>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
          <Route path="/post/:id">
            <PostPage />
          </Route>
          <Route path="/new-post">
            <CreateNewPostPage />
          </Route>
          <Route path="/edit-post/:id">
            <EditPostPage />
          </Route>
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
