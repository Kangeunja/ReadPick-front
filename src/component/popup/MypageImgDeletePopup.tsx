const MypageImgDeletePopup = ({ onClose }: any) => {
  const handleProfileDelete = () => {};

  return (
    <div className="review-popup__del">
      <div className="review-popup__del-box">
        <div className="review-popup__del-header">정말로 삭제하시겠습니까?</div>
        <div className="review-popup__del-info">
          삭제한 프로필 이미지는 복구할 수 없습니다.
        </div>

        <div className="review-popup__del-actions">
          <button
            className="review-del__popup-btn review-del__cancel-btn"
            onClick={() => onClose()}
          >
            취소
          </button>
          <button
            className="review-del__popup-btn review-del__btn"
            onClick={handleProfileDelete}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default MypageImgDeletePopup;
