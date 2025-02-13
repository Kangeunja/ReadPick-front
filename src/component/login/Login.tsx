import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

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
            className="id"
            type="text"
            placeholder="아이디"
            maxLength={15}
          />
          <input
            className="pw"
            type="password"
            placeholder="비밀번호"
            maxLength={15}
          />
          <button type="button" className="login-button">
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
