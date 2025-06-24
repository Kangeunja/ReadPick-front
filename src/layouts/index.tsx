import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      {/* 헤더 */}
      <Header />
      <main className="content-wrap">
        <Outlet />
      </main>
      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Layout;
