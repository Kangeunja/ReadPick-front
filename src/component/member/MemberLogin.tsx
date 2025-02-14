import { useEffect, useState } from "react";
import MemberLoginPopup from "../popup/MemberLoginPopup";
import axiosInstance from "../../api/axiosInstance";

const MemberLogin = () => {
  const [isShowPopup, setShowPopup] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    nickName: "",
    id: "",
    pw: "",
    email: "",
  });

  const handleChange = (e: any) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUserInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleLoginController = () => {
    // setShowPopup(true);
    axiosInstance
      .post("http://localhost:8080/userInsert", {
        userName: userInfo.userName,
        nickName: userInfo.nickName,
        id: userInfo.id,
        pw: userInfo.pw,
        email: userInfo.email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Member Login failed", error);
      });
  };

  return (
    <>
      <div className="sub-img"></div>
      <div className="member-wrap">
        <div className="member-number-text">
          <p className="number">2/2</p>
          <p className="require">
            <span>*</span>필수입력사항
          </p>
        </div>
        <div className="member-title">회원가입</div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>아이디</p>
            <p>*</p>
          </div>
          <input
            name="id"
            className="mem-id"
            type="text"
            placeholder="6자이상의 영문 혹은 영문과 숫자조합"
            maxLength={15}
            value={userInfo.id}
            onChange={handleChange}
          />
          <button type="button" className="id-check">
            중복확인
          </button>
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>비밀번호</p>
            <p>*</p>
          </div>
          <input
            name="pw"
            className="mem-pw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            maxLength={15}
            value={userInfo.pw}
            onChange={handleChange}
          />
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>비밀번호확인</p>
            <p>*</p>
          </div>
          <input
            className="mem-pw"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            maxLength={15}
          />
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>이름</p>
            <p>*</p>
          </div>
          <input
            name="userName"
            className="mem-name"
            type="text"
            placeholder="이름을 입력해주세요"
            maxLength={15}
            value={userInfo.userName}
            onChange={handleChange}
          />
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>닉네임</p>
            <p>*</p>
          </div>
          <input
            name="nickName"
            className="mem-nickName"
            type="text"
            placeholder="닉네임을 입력해주세요"
            maxLength={15}
            value={userInfo.nickName}
            onChange={handleChange}
          />
        </div>
        <div className="member-input-wrap">
          <div className="member-input-text">
            <p>이메일</p>
            <p>*</p>
          </div>
          <input
            name="email"
            className="mem-email"
            type="text"
            placeholder="예:dmswk2414@readpick.com"
            // maxLength={15}
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>
        <div className="member-button-wrap">
          <button className="mem-cancel">취소</button>
          <button className="mem-ok" onClick={handleLoginController}>
            회원가입
          </button>
        </div>
      </div>
      {isShowPopup && <MemberLoginPopup onClose={() => setShowPopup(false)} />}
    </>
  );
};
export default MemberLogin;
