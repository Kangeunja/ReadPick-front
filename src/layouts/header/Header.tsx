import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import { useState } from "react";
import "../../assets/css/header.css";

const Header = () => {
  const navigate = useNavigate();

  // 로그인유무
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 검색포커싱
  const [isFocused, setIsFocused] = useState(false);

  // 로그아웃 api
  const handleLogout = () => {
    axiosInstance
      .post("/logout", {})
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          if (window.confirm("로그아웃하시겠습니까?")) {
            // setUserInfo(null);
            alert("로그아웃되었습니다.");
            setUserInfo({
              userIdx: null,
              nickName: "",
              userName: "",
              email: "",
              adminAt: "",
              firstAt: "",
              id: "",
            });
            sessionStorage.removeItem("recoil-persist");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <div className="content">
        <div className="logo" onClick={() => navigate("/")}></div>
        <div className={`search-bar-wrap ${isFocused ? "focused" : ""}`}>
          <i className="search-icon"></i>
          <input
            className="search"
            type="search"
            placeholder="원하는 도서명이나 키워드를 검색해보세요."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        <div className="side-menu">
          {userInfo.userIdx ? (
            <>
              <button
                className="menu-mypage"
                onClick={() => navigate("/mypage")}
              >
                {/* <div className="menu-mypage-img"></div> */}
                <p className="menu-mypage-text">마이페이지</p>
              </button>
              <button className="menu-logout" onClick={handleLogout}>
                {/* <div className="menu-logout-img"></div> */}
                <p className="menu-logout-text">로그아웃</p>
              </button>
            </>
          ) : (
            <>
              <button className="menu-logIn" onClick={() => navigate("/login")}>
                {/* <div className="menu-login-img"></div> */}
                <p className="menu-login-text">로그인</p>
              </button>
              <button
                className="menu-membership"
                onClick={() => navigate("/member")}
              >
                {/* <div className="menu-membership-img"></div> */}
                <p className="menu-membership-text">회원가입</p>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
