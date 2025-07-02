import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../assets/css/memberkeywordDetailPopup.css";

const MemberKeywordDetailPopup = ({ onClose, selectedReview }: any) => {
  const [editedReview, setEditedReview] = useState(selectedReview);
  // 리뷰내용 포커싱
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      // 팝업이 닫힐 때 스크롤 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDetailPopup = (e: any) => {
    setEditedReview((prev: any) => ({
      ...prev,
      content: e.target.value,
    }));
    // const updateReview = [...editedReview];
    // const reviewIndex = updateReview.findIndex((item) => item.rvIdx === rvIdx);

    // setEditedReview(updateReview);
    // const value = e.target.value;
    // setEditedReview([...editedReview, { content: value }]);
  };

  // 저장버튼
  const handleDetailPopupSave = () => {
    // 입력이 비었을 경우
    if (editedReview.content.trim() === "") {
      alert("내용을 입력해주세요.");
      inputRef.current?.focus();
      return;
    }
    // 바뀐 내용이 없을 경우
    if (editedReview.content === selectedReview.content) {
      alert("기존 내용과 동일합니다.");
      inputRef.current?.focus();
      return;
    }

    axiosInstance
      .post("/reviewUpdate", {
        bookIdx: editedReview.bookIdx,
        content: editedReview.content,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          alert("수정되었습니다.");
          onClose(editedReview);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="keyword-detail-popup-wrap">
      <div className="keyword-detail-popup-box">
        <div className="keyword-detail-popup-btn-wrap">
          <p>리뷰 수정</p>
          <button
            type="button"
            className="keyword-detail-popup-cancel"
            onClick={() => onClose()}
          ></button>
        </div>
        <div
          key={editedReview.rvIdx}
          className="keyword-detail-popup-review-box"
        >
          <div className="keyword-detail-popup-review-img">
            <img src={editedReview.fileName} alt="이미지" />

            <div className="keyword-detail-popup-text-wrap">
              <p>{editedReview.nickName}</p>
              <input
                ref={inputRef}
                type="text"
                value={editedReview.content}
                onChange={(e) => handleDetailPopup(e)}
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          className="keyword-detail-popup-save"
          onClick={handleDetailPopupSave}
        >
          저장하기
        </button>
      </div>
    </div>
  );
};
export default MemberKeywordDetailPopup;
