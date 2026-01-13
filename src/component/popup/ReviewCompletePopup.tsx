import { useEffect } from "react";
import "../../assets/css/ReviewSubmitSuccessPopup.css";

interface Props {
  type: "write" | "edit" | null;
  onFinish: () => void;
}

const ReviewCompletePopup = ({ type, onFinish }: Props) => {
  return (
    <div className="review-success__popup">
      <div className="review-success__popup-box">
        {type === "write" && <p>리뷰 작성이 완료되었습니다.</p>}
        {type === "edit" && <p>리뷰 수정이 완료되었습니다.</p>}
      </div>
    </div>
  );
};

export default ReviewCompletePopup;
