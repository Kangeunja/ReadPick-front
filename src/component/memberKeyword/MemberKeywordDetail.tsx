import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";
import MemberKeywordDetailPopup from "../popup/MemberKeywordDetailPopup";
// import { userInfoState } from "../../recoil/userInfo";

interface BookDetail {
  author: string;
  bookName: string;
  bcontent: string;
  content: string;
  bookIdx: number;
}

interface Review {
  content: string;
  regDate: string;
  nickName: string;
  bookIdx: number;
}

const MemberKeywordDetail = () => {
  const { bookIdx } = useParams();
  const bookIdxNumber = bookIdx ? parseInt(bookIdx, 10) : null;
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [bookImg, setBookImg] = useState({
    fileName: "",
  });
  const [isContent, setIsContent] = useState(false);
  const [text, setText] = useState("");
  const [user] = useRecoilState(userState);
  const navigate = useNavigate();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [review, setReview] = useState<Review[]>([]);
  const [reviewMessage, setReviewMessage] = useState(false);
  // const userInfo = useRecoilValue(userInfoState);
  const [isPopup, setIsPopup] = useState(false);

  useEffect(() => {
    if (bookIdxNumber !== null) {
      handleBookDetail(bookIdxNumber);
      bookDetailImg(bookIdxNumber);
      reviewList(bookIdxNumber);
    }
  }, [bookIdxNumber]);

  const handleBookDetail = (bookIdx: number) => {
    axiosInstance
      .get("/bookOne", {
        params: {
          bookIdx: bookIdx,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookDetail(res.data);
        if (!res.data.content || res.data.content.trim() === "") {
          setIsContent(true);
        } else {
          setIsContent(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const bookDetailImg = (bookIdx: number) => {
    axiosInstance
      .get("/bookImageOne", {
        params: {
          bookIdx: bookIdx,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setText(value);

    e.target.style.height = "50px";
    e.target.style.height = `${e.target.scrollHeight}px`;

    // const scrollHeight = e.target.scrollHeight;
    // setHeight(`${scrollHeight}px`);
  };

  // 작성하기
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

  const reviewList = (bookIdx: number) => {
    axiosInstance
      .get("/reviewList", {
        params: {
          bookIdx: bookIdx,
        },
      })
      .then((res) => {
        console.log(res.data);
        setReview(res.data);
        if (res.data.length === 0) {
          setReviewMessage(true);
        } else {
          setReviewMessage(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReviewUpdate = (e: any) => {
    setIsPopup(true);
  };

  return (
    <>
      <div className="detail-wrap">
        <div className="detail-img-wrap">
          <div className="detail-img">
            {bookImg && (
              <img
                src={bookImg.fileName.replace("coversum", "cover500")}
                alt="책 이미지"
              />
            )}
          </div>
          <div className="detail-icon"></div>
        </div>
        <div className="detail-box-wrap">
          {bookDetail && (
            <div className="detail-bookDetail-wrap">
              <p>{bookDetail.bookName}</p>
              <p>{bookDetail.author}</p>
              {isContent ? (
                <p>줄거리가 없습니다.</p>
              ) : (
                <p>{bookDetail.content}</p>
              )}
            </div>
          )}

          <button className="detail-button">이 책 사고 싶어요!</button>
          <div className="detail-review">이 책을 읽은 사람들의 리뷰</div>
          <div className="detail-review-wrap">
            <div className="detail-top-wrap">
              {!reviewMessage ? (
                <>
                  {review.map((item, index) => (
                    <div key={index} className="detail-review-box">
                      <div className="detail-review-img"></div>
                      <div className="detail-text-wrap">
                        <p>{item.nickName}</p>
                        <p>#메이플</p>
                        <input type="text" value={item.content} readOnly />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="detail-review-no">아직 리뷰가 없습니다.</p>
              )}
              <div className="detail-button-wrap">
                <button onClick={handleReviewUpdate}>수정</button>
                <button>삭제</button>
              </div>
            </div>

            <div className="detail-review-button-wrap">
              <textarea
                ref={textAreaRef}
                className="detail-review-insert-wrap"
                placeholder="리뷰를 작성해주세요(200자 이내)"
                value={text}
                onChange={handleInputChange}
                maxLength={200}
              ></textarea>
              <button
                className="detail-review-button"
                onClick={handleInsertReview}
              >
                작성하기
              </button>
            </div>
          </div>
        </div>
      </div>
      {isPopup && bookIdxNumber !== null && bookIdxNumber > 0 && (
        <MemberKeywordDetailPopup
          // userInfo={userInfo}
          reviewList={reviewList}
          review={review}
          onClose={() => setIsPopup(false)}
        />
      )}
    </>
  );
};
export default MemberKeywordDetail;
