import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      {/* 헤더 */}
      <Header />
      {children}
      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default Layout;
