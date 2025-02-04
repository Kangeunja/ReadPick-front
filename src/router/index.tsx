import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../layouts/nav";
import Main from "../component/main/Main";
import Login from "../component/login/Login";

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
      </Routes>
    </BrowserRouter>
  );
};

export default BrowserRouterDom;
