import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    id: "",
    pw: "",
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserLogin((state) => ({
      ...state,
      [name]: newValue,
    }));

    let newValue = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ""); // 한글 제거

    if (name === "id" || name === "pw") {
      const idRegex = /^[a-zA-Z][a-zA-Z0-9]{0,14}$/;
      if (!idRegex.test(newValue)) return;
    }
  };

  // 비밀번호 숨기기/보이기 토글 함수
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // 로그인
  const handleLogin = () => {
    if (userLogin.id === "") {
      alert("아이디를 입력해주세요");
      return;
    }
    if (userLogin.pw === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    axiosInstance
      .post("/login", {
        id: userLogin.id,
        pw: userLogin.pw,
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
      <div className="login-wrap">
        <div className="login-title">
          다양한 경험, 소중한 추억
          <br />
          <span>ReadPick</span> 에서 <br />
          한번 만나보세요
        </div>
        <div className="input-wrap">
          <input
            name="id"
            className="id"
            type="text"
            placeholder="아이디"
            maxLength={15}
            value={userLogin.id}
            onChange={handleChange}
          />
          <input
            name="pw"
            className="pw"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="비밀번호"
            maxLength={15}
            value={userLogin.pw}
            onChange={handleChange}
          />

          {!isPasswordVisible ? (
            <div className="login-toggle-visibility">
              <AiFillEyeInvisible onClick={togglePasswordVisibility} />
            </div>
          ) : (
            <div className="login-toggle-visibility">
              <AiFillEye onClick={togglePasswordVisibility} />
            </div>
          )}
          <button type="button" className="login-button" onClick={handleLogin}>
            로그인
          </button>
          <div className="login-bottom">
            <div className="log-in" onClick={() => navigate("/member")}>
              회원가입
            </div>
            <div className="find-id">아이디 찾기</div>
            <div className="find-pw">비밀번호 찾기</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
