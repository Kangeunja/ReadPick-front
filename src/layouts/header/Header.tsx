import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";

const Header = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // useEffect(() => {
  //   axiosInstance
  //     .post("/checkLogin", {})
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data === "success") {
  //         setUserInfo(true);
  //       } else {
  //         setUserInfo(null);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [setUserInfo]);

  const handleLogout = () => {
    axiosInstance
      .post("/logout", {})
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          setUserInfo(null);
          sessionStorage.removeItem("recoil-persist");
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
              <button className="menu-mypage">
                <div
                  className="menu-mypage-img"
                  onClick={() => navigate("/mypage")}
                ></div>
                <p className="menu-mypage-text">마이페이지</p>
              </button>
              <button className="menu-logout" onClick={handleLogout}>
                <div className="menu-logout-img"></div>
                <p className="menu-logout-text">로그아웃</p>
              </button>
            </>
          ) : (
            <>
              <button className="menu-logIn" onClick={() => navigate("/login")}>
                <div className="menu-login-img"></div>
                <p className="menu-login-text">로그인</p>
              </button>
              <button
                className="menu-membership"
                onClick={() => navigate("/member")}
              >
                <div className="menu-membership-img"></div>
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
