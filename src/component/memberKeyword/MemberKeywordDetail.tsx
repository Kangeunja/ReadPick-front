import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import MemberKeywordDetailPopup from "../popup/MemberKeywordDetailPopup";
import { userInfoState } from "../../recoil/userInfoState";
import { bookmarkState } from "../../recoil/bookmarkState";
import { isGoodState } from "../../recoil/isGoodState";
import axiosInstance from "../../api/axiosInstance";
import "../../assets/css/memberKeywordDetail.css";
import "../../assets/css/memberKeywordDetailReview.css";
import MemberKeywordDetailReviewPopup from "../popup/MemberKeywordDetailReviewPopup";
import SpinnerIcon from "../../icon/SpinnerIcon";
import profileDefaultImg from "../../assets/img/icon-profile.png";

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
  fileName: string;
}

const MemberKeywordDetail = () => {
  const navigate = useNavigate();
  const [user] = useRecoilState(userInfoState);
  const { bookIdx } = useParams();
  const bookIdxNumber = bookIdx ? parseInt(bookIdx, 10) : null;
  const [loading, setLoading] = useState(false);

  // 스크롤 포커싱
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 책 대표 이미지
  const [bookImg, setBookImg] = useState({
    fileName: "",
  });

  // 북마크 유무
  const [isBookMark, setIsBookMark] = useRecoilState(bookmarkState);

  // 책 상세 정보
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);

  // 책 줄거리 유무
  const [isContent, setIsContent] = useState(false);

  // 리뷰 없을 때 메세지
  const [reviewMessage, setReviewMessage] = useState(false);

  // 리뷰 리스트
  const [review, setReview] = useState<Review[]>([]);

  // 마지막 리뷰의 rvIdx
  const [lastRvIdx, setLastRvIdx] = useState(null);

  // 선택된 리뷰내용
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // 리뷰 수정 팝업
  const [isPopup, setIsPopup] = useState(false);

  // 추천 완료 유무
  const [isGood, setIsGood] = useRecoilState(isGoodState);

  // 책 추천수
  const [checkCount, setCheckCount] = useState(0);

  // 무한 스크롤 콘텐츠 유무
  const [more, setMore] = useState(true);

  // 리뷰작성 팝업
  const [isReviewPopup, setIsReviewPopup] = useState(false);

  useEffect(() => {
    // window.scrollTo(0, 0);
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

  // 책 대표 이미지 api
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

  // 북마크 추가 api
  const handleIsBookMark = () => {
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

  // 책 추천 api
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

  // 책 상세정보 api
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

  // 리뷰 리스트 api
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
        if (res.data.length > 0) {
          console.log("여기냐?");
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
  console.log(lastRvIdx);

  // 리뷰 신고버튼 api
  const handleDeclaration = (rvIdx: number) => {
    if (window.confirm("신고하시겠습니까?")) {
      axiosInstance
        .get("/reportReview", {
          params: { rvIdx: rvIdx },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data === "reportReview:success") {
            alert("신고 완료되었습니다.");
          } else {
            alert("이미 신고된 이력이 있습니다.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // 리뷰 수정버튼  api
  const handleReviewUpdate = (rvIdx: number) => {
    const reviewNumber = review.find((item) => item.rvIdx === rvIdx) || null;
    setSelectedReview(reviewNumber);
    setIsPopup(true);
  };

  // 리뷰 삭제버튼 api
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

      if (scrollTop + clientHeight >= scrollHeight - 200) {
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

  // 다음 리뷰리스트 api
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
        await new Promise((resolve) => setTimeout(resolve, 900)); // 다음 틱으로 넘기기
        setReview((prev) => [...prev, ...res.data]);
        setLastRvIdx(res.data[res.data.length - 1].rvIdx);
      } else {
        setMore(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // 찜 api
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

  // 추천해요 api
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
      <div className="keyword-detail-wrap">
        <div className="keyword-detail-img-wrap">
          <div className="keyword-detail-img">
            {bookImg && (
              <img
                src={bookImg.fileName.replace("coversum", "cover500")}
                alt="책 이미지"
              />
            )}
          </div>

          <div className="keyword-detail-icon-wrap">
            <div
              className={
                isBookMark ? `keyword-detail-save add` : "keyword-detail-save"
              }
              onClick={handleIsBookMark}
            ></div>
            <div className="keyword-detail-good-wrap">
              <div className="keyword-detail-good-text">{`추천해요${checkCount}`}</div>
              <div
                className={
                  isGood ? `keyword-detail-good add` : "keyword-detail-good"
                }
                onClick={handleIsGood}
              ></div>
            </div>
          </div>
        </div>

        <div className="keyword-detail-right-con-wrap">
          {bookDetail && (
            <>
              <div className="keyword-detail-right-text">
                <p>{bookDetail.bookName}</p>
                <p>{bookDetail.author}</p>
                {isContent ? (
                  <p>줄거리가 없습니다.</p>
                ) : (
                  <p>{bookDetail.content}</p>
                )}
              </div>

              <button
                className="keyword-detail-buy-button"
                onClick={() => (window.location.href = `${bookDetail.link}`)}
              >
                이 책 사고 싶어요!
              </button>
            </>
          )}

          <div className="keyword-detail-review-wrap">
            <div className="keyword-detail-review-text">
              <p>이 책을 읽은 사람들의 리뷰</p>
              <button onClick={() => setIsReviewPopup(true)}>
                리뷰 남기기
              </button>
            </div>

            <div className="keyword-detail-scroll-container">
              <div
                className={`keyword-detail-scroll-wrap ${
                  reviewMessage ? "no-review" : ""
                }`}
                ref={scrollRef}
              >
                {!reviewMessage ? (
                  <>
                    {review.map((item, index) => (
                      <div className="keyword-detail-box-wrap" key={index}>
                        <div className="keyword-detail-box">
                          {user?.nickName !== item.nickName ? (
                            <button
                              className="keyword-detail-declaration-button"
                              onClick={() => handleDeclaration(item.rvIdx)}
                            >
                              신고
                            </button>
                          ) : (
                            <div className="keyword-detail-button-wrap">
                              <button
                                onClick={() => handleReviewUpdate(item.rvIdx)}
                              >
                                수정
                              </button>
                              <button onClick={handleReviewDelete}>삭제</button>
                            </div>
                          )}
                          <div className="keyword-detail-review-img">
                            <img
                              src={`${
                                item.fileName === "default"
                                  ? profileDefaultImg
                                  : item.fileName
                              }`}
                              className={`${
                                item.fileName === "default"
                                  ? "keyword-detail-review-default-img"
                                  : "keyword-detail-review-set-img"
                              }`}
                              alt="이미지"
                            />
                          </div>
                          <div className="keyword-detail-text-wrap">
                            <p>{item.nickName}</p>
                            <input type="text" value={item.content} readOnly />
                          </div>
                        </div>
                      </div>
                    ))}
                    {loading && more && review.length > 0 && (
                      <SpinnerIcon />
                      // <div className="loading-spinner">로딩중</div>
                    )}
                  </>
                ) : (
                  <p className="keyword-detail-review-no">
                    아직 리뷰가 없어요!
                  </p>
                )}
              </div>
            </div>

            {/* <div
              className="keyword-detail-scroll-wrap"
              ref={scrollRef}
              style={{
                minHeight: reviewMessage ? "100px" : "auto",
                overflowY: "auto",
              }}
            >
              {!reviewMessage ? (
                <>
                  {review.map((item, index) => (
                    <div className="keyword-detail-box-wrap" key={index}>
                      <div className="keyword-detail-box">
                        {user?.nickName !== item.nickName ? (
                          <button
                            className="keyword-detail-declaration-button"
                            onClick={() => handleDeclaration(item.rvIdx)}
                          >
                            신고
                          </button>
                        ) : (
                          <div className="keyword-detail-button-wrap">
                            <button
                              onClick={() => handleReviewUpdate(item.rvIdx)}
                            >
                              수정
                            </button>
                            <button onClick={handleReviewDelete}>삭제</button>
                          </div>
                        )}
                        <div className="keyword-detail-review-img"></div>
                        <div className="keyword-detail-text-wrap">
                          <p>{item.nickName}</p>
                          <input type="text" value={item.content} readOnly />
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && more && review.length > 0 && (
                    <SpinnerIcon />
                    // <div className="loading-spinner">로딩중</div>
                  )}
                </>
              ) : (
                <p className="keyword-detail-review-no">아직 리뷰가 없어요!</p>
              )}
            </div> */}
          </div>
          {/* <div className="detail-review-wrap">
            <div
              className="detail-scroll-wrap"
              
              style={{ minHeight: reviewMessage ? "100px" : "auto" }}
            >
              {!reviewMessage ? (
                <>
                  {review.map((item, index) => (
                    <div className="detail-top-button-wrap" key={index}>
                      <div className="detail-review-box">
                        {user?.nickName !== item.nickName && (
                          <button
                            className="detail-declaration"
                            onClick={() => handleDeclaration(item.rvIdx)}
                          >
                            신고
                          </button>
                        )}

                        <div className="detail-review-img"></div>
                        <div className="detail-text-wrap">
                          <p>{item.nickName}</p>
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
                  {loading && more && review.length > 0 && (
                    <div className="loading-spinner">로딩중</div>
                  )}
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
          </div> */}
        </div>
      </div>
      {isPopup && selectedReview && (
        <MemberKeywordDetailPopup
          // userInfo={userInfo}
          // reviewList={reviewList}
          selectedReview={selectedReview}
          onClose={(updatedReview: any) => {
            setIsPopup(false);
            if (updatedReview) {
              setReview((prevReviews) =>
                prevReviews.map((review) =>
                  review.rvIdx === updatedReview.rvIdx
                    ? { ...review, ...updatedReview }
                    : review
                )
              );
            }
            // setMore(true);
            // setLastRvIdx(null);
            // reviewList(bookDetail?.bookIdx!); // 팝업 닫힐 때 리스트 다시 불러오기
          }}
        />
      )}
      {isReviewPopup && (
        <MemberKeywordDetailReviewPopup
          onClose={() => setIsReviewPopup(false)}
          bookDetail={bookDetail}
          reviewList={reviewList}
          bookImg={bookImg}
        />
      )}
    </>
  );
};
export default MemberKeywordDetail;
