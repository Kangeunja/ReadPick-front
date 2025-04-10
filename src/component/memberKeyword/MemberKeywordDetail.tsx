import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import MemberKeywordDetailPopup from "../popup/MemberKeywordDetailPopup";
import { userInfoState } from "../../recoil/userInfoState";
import { bookmarkState } from "../../recoil/bookmarkState";
import { isGoodState } from "../../recoil/isGoodState";

interface BookDetail {
  author: string;
  bookName: string;
  bcontent: string;
  content: string;
  bookIdx: number;
  link: string;
}

interface Review {
  content: string;
  regDate: string;
  nickName: string;
  bookIdx: number;
  rvIdx: number;
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
  const [user] = useRecoilState(userInfoState);
  const navigate = useNavigate();
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [review, setReview] = useState<Review[]>([]); // 리뷰 데이터
  const [reviewMessage, setReviewMessage] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const [loading, setLoading] = useState(false);
  const [lastRvIdx, setLastRvIdx] = useState(null);
  const [more, setMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isBookMark, setIsBookMark] = useRecoilState(bookmarkState);
  const [isGood, setIsGood] = useRecoilState(isGoodState);
  // const [isGood, setIsGood] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (bookIdxNumber !== null) {
      handleBookDetail(bookIdxNumber);
      bookDetailImg(bookIdxNumber);
      reviewList(bookIdxNumber);
      handleCheckGood();
    }
    if (user) {
      bookMarkCheck();
      goodCheck();
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

  // 작성하기 버튼
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

  // 리뷰리스트
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
        // fetchData(res.data);
        if (res.data.length > 0) {
          setLastRvIdx(res.data[res.data.length - 1].rvIdx); // 마지막 리뷰의 rvIdx 저장
        }
        setReviewMessage(res.data.length === 0);
        // if (res.data.length === 0) {
        //   setReviewMessage(true);
        // } else {
        //   setReviewMessage(false);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 리뷰수정버튼
  const handleReviewUpdate = (rvIdx: number) => {
    const reviewNumber = review.find((item) => item.rvIdx === rvIdx) || null;
    setSelectedReview(reviewNumber);
    setIsPopup(true);
  };

  // 리뷰삭제버튼
  const handleReviewDelete = () => {
    if (window.confirm("정말로 해당 리뷰를 삭제하시겠습니까?")) {
      axiosInstance
        .get("/reviewDelete", {
          params: {
            bookIdx: bookDetail?.bookIdx,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data === "success") {
            alert("해당 리뷰가 삭제되었습니다.");
            reviewList(bookDetail?.bookIdx!);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 무한스크롤
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current && loading && !more) return;

      const scrollContainer = scrollRef.current as HTMLDivElement;
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchMoreReview();
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [more, loading, lastRvIdx]);

  const fetchMoreReview = async () => {
    if (!more || loading || lastRvIdx === null) return;
    setLoading(true);

    try {
      const res = await axiosInstance.get("/reviewMore", {
        params: {
          rvIdx: lastRvIdx,
        },
      });

      if (res.data.length > 0) {
        setReview((prev) => [...prev, ...res.data]);
        // setLastRvIdx(res.data[res.data.length - 1].rvIdx);
      } else {
        setMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 북마크 추가
  const handleBookMark = () => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    const bookIdx = bookDetail?.bookIdx;
    console.log(bookIdx);
    console.log(isBookMark);
    if (bookIdx && bookIdx > 0) {
      axiosInstance
        // .post("/bookmark", { bookIdx: bookIdx })
        .post(`/bookmark?bookIdx=${bookIdx}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "로그인필요.") {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
          } else if (res.data.message === "북마크추가완료") {
            alert("찜목록에 추가되었습니다.");
            setIsBookMark(true);
            if (window.confirm("찜목록으로 이동하시겠습니까?")) {
              navigate("/mypage");
            }
          } else {
            alert("찜목록에 해제되었습니다.");
            setIsBookMark(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const bookMarkCheck = () => {
    axiosInstance
      .get("/isBookmark", {
        params: { bookIdx: bookIdx },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "Y") {
          setIsBookMark(true);
        } else {
          setIsBookMark(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 책추천 api
  const handleIsGood = () => {
    axiosInstance
      .post(`/recommend?bookIdx=${bookIdx}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "로그인필요.") {
          alert("로그인이 필요한 서비스입니다.");
          navigate("/login");
        }
        if (res.data.message === "추천완료") {
          setIsGood(true);
        } else {
          setIsGood(false);
        }
        handleCheckGood();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 책 추천수 api
  const handleCheckGood = () => {
    if (!bookIdxNumber) return;
    axiosInstance
      .get("/recCount", {
        params: {
          bookIdx: bookIdxNumber,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCheckCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 추천확인 api
  const goodCheck = () => {
    axiosInstance
      .get("/isRec", {
        params: { bookIdx: bookIdx },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "Y") {
          setIsGood(true);
        } else {
          setIsGood(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchData = async () => {
  //   if (!more || loading || !lastRvIdx) return;
  //   setLoading(true);

  //   try {
  //     const res = await axiosInstance.get("/reviewMore", {
  //       params: {
  //         rvIdx: lastRvIdx,
  //       },
  //     });
  //     if (res.data.length > 0) {
  //       // setReview((prev) => [...prev, ...res.data]);
  //       // setLastRvIdx(res.data[res.data[res.data.length - 1].rvIdx]);
  //       setLastRvIdx(res.data[res.data.length - 1].rvIdx);
  //     } else {
  //       setMore(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

          <div
            className={isBookMark ? `detail-icon add` : "detail-icon"}
            onClick={handleBookMark}
          ></div>
          <div className="detail-bottom-icon-wrap">
            <div
              className="detail-good-message"
              onClick={handleCheckGood}
            >{`추천해요${checkCount}`}</div>
            <div
              className={isGood ? `detail-icon-good add` : "detail-icon-good"}
              onClick={handleIsGood}
            ></div>
          </div>
        </div>
        <div className="detail-box-wrap">
          {bookDetail && (
            <>
              <div className="detail-bookDetail-wrap">
                <p>{bookDetail.bookName}</p>
                <p>{bookDetail.author}</p>
                {isContent ? (
                  <p>줄거리가 없습니다.</p>
                ) : (
                  <p>{bookDetail.content}</p>
                )}
              </div>

              <button
                className="detail-button"
                onClick={() => (window.location.href = `${bookDetail.link}`)}
              >
                이 책 사고 싶어요!
              </button>
            </>
          )}

          <div className="detail-review">이 책을 읽은 사람들의 리뷰</div>
          <div className="detail-review-wrap">
            <div
              className="detail-scroll-wrap"
              ref={scrollRef}
              style={{ minHeight: reviewMessage ? "100px" : "auto" }}
            >
              {!reviewMessage ? (
                <>
                  {review.map((item, index) => (
                    <div className="detail-top-button-wrap" key={index}>
                      <div className="detail-review-box">
                        <div className="detail-review-img"></div>
                        <div className="detail-text-wrap">
                          <p>{item.nickName}</p>
                          {/* <p>#메이플</p> */}
                          <input type="text" value={item.content} readOnly />
                        </div>
                      </div>
                      {user?.nickName === item.nickName && (
                        <div className="detail-button-wrap">
                          <button
                            onClick={() => handleReviewUpdate(item.rvIdx)}
                          >
                            수정
                          </button>
                          <button onClick={handleReviewDelete}>삭제</button>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <p className="detail-review-no">아직 리뷰가 없습니다.</p>
              )}
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
      {isPopup && selectedReview && (
        <MemberKeywordDetailPopup
          // userInfo={userInfo}
          reviewList={reviewList}
          review={selectedReview}
          // onClose={() => setIsPopup(false)}
          onClose={() => {
            setIsPopup(false);
            reviewList(bookDetail?.bookIdx!); // 팝업 닫힐 때 리스트 다시 불러오기
          }}
        />
      )}
    </>
  );
};
export default MemberKeywordDetail;
