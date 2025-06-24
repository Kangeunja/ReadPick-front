import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "../layouts";
import Main from "../component/main/Main";
import Login from "../component/login/Login";
import Member from "../component/member/Member";
import MemberLogin from "../component/member/MemberLogin";
import MemberKeyword from "../component/memberKeyword/MemberKeyword";
import MemberKeywordDetail from "../component/memberKeyword/MemberKeywordDetail";
import MyPage from "../component/mypage/MyPage";
import { RecoilRoot } from "recoil";
import Admin from "../component/admin/Admin";
import AdminMain from "../component/admin/AdminMain";

const BrowserRouterDom = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/member" element={<Member />}></Route>
            <Route path="/member/login" element={<MemberLogin />}></Route>
            <Route path="/member/keyword" element={<MemberKeyword />}></Route>
            <Route
              // path="/member/keyword/detail"
              path="/member/keyword/detail/:bookIdx"
              element={<MemberKeywordDetail />}
            ></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Route>

          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/main" element={<AdminMain />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default BrowserRouterDom;
