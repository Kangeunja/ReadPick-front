import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container">
      {/* 헤더 */}
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
