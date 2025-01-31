import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <p>이용약관</p>
          <p>개인정보처리방침</p>
          <p>고객센터</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-content">
          <div className="footer-logo"></div>
          <div className="footer-info">
            <p className="footer-compony">(주) READ PICK</p>
            <div className="footer-left-text">
              <p>사업자번호</p>
              <p>전화번호</p>
              <p>팩스</p>
              <p>이메일</p>
            </div>
            <div className="footer-right-text">
              <p>211-82-08632</p>
              <p>123-4567</p>
              <p>064-123-4567</p>
              <p>redPick@redPick.co.kr</p>
            </div>
          </div>
          <div className="footer-customer">
            <p className="footer-name">CUSTOMER CENTER</p>
            <p className="footer-number">1234-5678</p>
            <div className="footer-left-mon">
              <p>MON-FRI</p>
              <p>HOLIDAY</p>
            </div>
            <div className="footer-right-time">
              <p>09:00 - 18:00</p>
              <p>OFF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
