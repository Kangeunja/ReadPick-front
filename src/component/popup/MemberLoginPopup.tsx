import { useEffect } from "react";

const MemberLoginPopup = ({ onClose }: any) => {
  useEffect(() => {
    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";

    return () => {
      // 팝업이 닫힐 때 스크롤 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="popup-background">
      <div className="popup-box">
        <div className="popup-title">
          <p>관심사 PICK</p>
          <p>관심사 키워드를 통해 오늘의 책 또는 관련책을 추천해줍니다.</p>
        </div>
        <div className="popup-container">
          <div className="popup-sub-title"># 문구문구문구</div>
          <ul className="popup-con">
            <li>시사</li>
            <li>실무기술</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
          </ul>
          <ul className="popup-con">
            <li>시사</li>
            <li>실무기술</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
          </ul>
          <ul className="popup-con">
            <li>시사</li>
            <li>실무기술</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
          </ul>
          <ul className="popup-con">
            <li>시사</li>
            <li>실무기술</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
          </ul>

          <div className="popup-sub-title"># 문구문구문구</div>
          <ul className="popup-con">
            <li>시사</li>
            <li>실무기술</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
          </ul>
          <ul className="popup-con">
            <li>시사</li>
            <li>실무기술</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
            <li>엔지니어링</li>
          </ul>
        </div>
        <button className="button-pick" onClick={onClose}>
          선택완료
        </button>
      </div>
    </div>
  );
};
export default MemberLoginPopup;
