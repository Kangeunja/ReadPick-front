import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../component/main/Main";
import Layout from "../layouts/nav";

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
      </Routes>
    </BrowserRouter>
  );
};

export default BrowserRouterDom;
