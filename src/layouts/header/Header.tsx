import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axiosInstance
      .post("/userInfo")
      .then((res) => {
        console.log(res);
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log("User profile load failed", error);
        setUserInfo(null); // 로그인 안된 상태
      });
  }, []);

  const handleLogout = () => {
    axiosInstance
      .post("/logout")
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          setUserInfo(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <div className="content">
        <div className="logo" onClick={(e) => navigate("/")}></div>
        <div className="search-bar">
          <i className="search-icon"></i>
          <input
            className="search"
            type="search"
            placeholder="원하는 도서명이나 키워드를 검색해보세요."
          />
        </div>
        <div className="side-menu">
          {userInfo ? (
            <>
              <button className="menu-logIn">마이페이지</button>
              <button className="menu-membership" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button className="menu-logIn" onClick={() => navigate("/login")}>
                로그인
              </button>
              <button
                className="menu-membership"
                onClick={() => navigate("/member")}
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
