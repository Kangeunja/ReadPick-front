import React from "react";

const Header = () => {
  return (
    <div className="content">
      <div className="logo"></div>
      {/* <input type="text" className="search" /> */}
      <div className="search-bar">
        <i className="search-icon"></i>
        <input
          className="search"
          type="search"
          placeholder="원하는 도서명이나 키워드를 검색해보세요."
        />
      </div>
      <div className="side-menu">
        <p>로그인</p>
        <p>회원가입</p>
      </div>
    </div>
  );
};

export default Header;
