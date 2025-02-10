import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../layouts/nav";
import Main from "../component/main/Main";
import Login from "../component/login/Login";
import Member from "../component/member/Member";
import MemberLogin from "../component/member/MemberLogin";
import MemberKeyword from "../component/memberKeyword/MemberKeyword";
import MemberKeywordDetail from "../component/memberKeyword/MemberKeywordDetail";

const BrowserRouterDom = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Main />
            </Layout>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        ></Route>
        <Route
          path="/member"
          element={
            <Layout>
              <Member />
            </Layout>
          }
        ></Route>
        <Route
          path="/member/login"
          element={
            <Layout>
              <MemberLogin />
            </Layout>
          }
        ></Route>
        <Route
          path="/member/keyword"
          element={
            <Layout>
              <MemberKeyword />
            </Layout>
          }
        ></Route>
        <Route
          path="/member/keyword/detail"
          element={
            <Layout>
              <MemberKeywordDetail />
            </Layout>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default BrowserRouterDom;
