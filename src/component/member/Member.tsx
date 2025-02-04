const Member = () => {
  return (
    <>
      <div className="sub-img"></div>

      <div className="member-wrap">
        <p className="number">1/2</p>
        <div className="member-title">회원가입약관동의</div>
        <div className="member-text-wrap">
          <div className="icon-check"></div>
          <div className="member-text">전체 약관에 동의합니다.</div>
        </div>
        <div className="member-top-box">
          <div className="member-top-wrap">
            <div className="icon-check"></div>
            <div className="member-top-text">
              회원가입약관에 동의합니다.(필수)
            </div>
          </div>
          <div className="member-top-con">
            <p>제1조</p>
            <p>
              약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의
              <br />
              약관동의약관동의약관동의약관동의약관동의약관동의약관동의약관동의
            </p>
          </div>
        </div>
        <div className="member-top-box">
          <div className="member-top-wrap">
            <div className="icon-check"></div>
            <div className="member-top-text">
              개인정보처리방침에 동의합니다.(필수)
            </div>
          </div>
          <div className="member-top-con">
            <p>개인정보의 수집 및 이용목적</p>
            <p>
              다음목적을 위하여 개인정보를 수집합니다. <br />
              이용자 식별 및 본인확인, 가입의사 확인, 불량회원 부정이용 방지,
              불만처리 등 민원처리, 공지사항 전달, 회원탈퇴 의사확인
            </p>
          </div>
        </div>
        <button className="member-check">확인</button>
      </div>
    </>
  );
};
export default Member;
