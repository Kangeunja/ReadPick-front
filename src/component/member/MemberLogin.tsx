const MemberLogin = () => {
  return (
    <>
      <div className="sub-img"></div>
      <div className="member-wrap">
        <p className="number">2/2</p>
        <div className="member-title">회원가입</div>
        <div className="member-input-wrap">
          <p>아이디</p>
          <input
            className="mem-id"
            type="text"
            placeholder="아이디를 입력해주세요"
            maxLength={15}
          />
        </div>
        <div className="member-input-wrap">
          <p>비밀번호</p>
          <input
            className="mem-pw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            maxLength={15}
          />
        </div>
        <div className="member-input-wrap">
          <p>비밀번호확인</p>
          <input
            className="mem-pw"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            maxLength={15}
          />
        </div>
        <div className="member-input-wrap">
          <p>이름</p>
          <input
            className="mem-name"
            type="text"
            placeholder="이름을 입력해주세요"
            maxLength={15}
          />
        </div>
        <div className="member-input-wrap">
          <p>이메일</p>
          <input
            className="mem-email"
            type="text"
            placeholder="이메일을 입력해주세요"
            maxLength={15}
          />
        </div>
        <div className="member-button-wrap">
          <button className="mem-cancel">취소</button>
          <button className="mem-ok">회원가입</button>
        </div>
      </div>
    </>
  );
};
export default MemberLogin;
