const Header = () => {
  return (
    <div className="header">
      <div className="content">
        <div className="logo"></div>
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
    </div>
  );
};

export default Header;
