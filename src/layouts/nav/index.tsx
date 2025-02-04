import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* 헤더 */}
      <Header />
      {children}
      {/* 푸터 */}
      <Footer />
    </>
  );
};

export default Layout;
