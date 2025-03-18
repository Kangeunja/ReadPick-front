import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const MemberKeywordDetailPopup = ({ onClose, review }: any) => {
  console.log(review);
  const [editedReview, setEditedReview] = useState(review);

  useEffect(() => {
    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";
    return () => {
      // 팝업이 닫힐 때 스크롤 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDetailPopup = (e: any, rvIdx: number) => {
    const updateReview = [...editedReview];
    const reviewIndex = updateReview.findIndex((item) => item.rvIdx === rvIdx);
    updateReview[reviewIndex].content = e.target.value;
    setEditedReview(updateReview);
    // const value = e.target.value;
    // setEditedReview([...editedReview, { content: value }]);
  };

  // 저장버튼
  const handleDetailPopupSave = () => {
    const updatedReviews = editedReview
      .filter(
        (item: any) => item.bookIdx !== undefined && item.bookIdx !== null
      ) // bookIdx가 undefined 또는 null이 아닌 경우만 포함
      .map((item: any) => ({
        bookIdx: item.bookIdx,
        content: item.content,
      }));

    // if (bookIdxNumber && bookIdxNumber > 0) {
    if (updatedReviews.length > 0) {
      axiosInstance
        .post("/reviewUpdate", {
          updatedReviews,
        })
        .then((res) => {
          console.log(res);
          if (res.data === "success") {
            onClose();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="detail-popup">
      <div className="detail-popup-wrap">
        <h3>리뷰 수정</h3>
        <div className="detail-popup-top-wrap">
          {review.map((item: any, index: number) => (
            <div key={item.rvIdx} className="detail-popup-review-box">
              <div className="detail-review-img"></div>
              <div className="detail-text-wrap">
                <p>{item.nickName}</p>
                <p>#메이플</p>
                <input
                  type="text"
                  value={item.content}
                  onChange={(e) => handleDetailPopup(e, item.rvIdx)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="detail-popup-save"
          onClick={handleDetailPopupSave}
        >
          저장하기
        </button>
        <button
          type="button"
          className="detail-popup-cancel"
          onClick={() => onClose()}
        ></button>
      </div>
    </div>
  );
};
export default MemberKeywordDetailPopup;
