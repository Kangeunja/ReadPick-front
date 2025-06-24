import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../recoil/userInfoState";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const MemberKeywordDetailReviewPopup = ({
  onClose,
  bookDetail,
  reviewList,
  bookImg,
}: any) => {
  const navigate = useNavigate();

  // 텍스트 빈값으로 저장
  const [text, setText] = useState("");
  // 텍스트 포커싱
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  // 유저 정보
  const [user] = useRecoilState(userInfoState);

  // 리뷰 작성하기 버튼
  const handleInsertReview = () => {
    if (user) {
      if (text !== "") {
        axiosInstance
          .post("/reviewInsert", {
            bookIdx: bookDetail?.bookIdx,
            content: text,
          })
          .then((res) => {
            console.log(res);
            if (res.data === "reviewInsert:fail") {
              alert("리뷰는 책 한 권당 1개만 작성가능합니다.");
              return;
            } else {
              alert("리뷰가 작성완료되었습니다.");
              reviewList(bookDetail?.bookIdx!);
              setText("");
              textAreaRef.current?.focus();
              onClose();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("내용을 작성해주세요");
        textAreaRef.current?.focus();
      }
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
    }
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setText(value);
  };

  return (
    <div className="keyword-detail-review-popup">
      <div className="keyword-detail-review-popup-box">
        <div className="keyword-detail-review-popup-text">
          <p>리뷰 남기기</p>
          <div className="keyword-detail-review-popup-btn-wrap">
            <button onClick={() => onClose()}>나가기</button>
            <button onClick={handleInsertReview}>업로드</button>
          </div>
        </div>
        <div className="keyword-detail-review-popup-img-wrap">
          {bookImg && (
            <img
              src={bookImg.fileName.replace("coversum", "cover500")}
              alt="책 이미지"
            />
          )}
          <div>
            {bookDetail && (
              <>
                <p>{bookDetail.bookName}</p>
                <p>{bookDetail.author}</p>
              </>
            )}
          </div>
        </div>
        <textarea
          ref={textAreaRef}
          className="detail-review-insert"
          placeholder="리뷰를 작성해주세요(200자 이내)"
          value={text}
          onChange={handleInputChange}
        ></textarea>
      </div>
    </div>
  );
};

export default MemberKeywordDetailReviewPopup;
