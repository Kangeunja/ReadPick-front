import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";

interface BookDetail {
  author: string;
  bookName: string;
  bcontent: string;
  content: string;
  bookIdx: string;
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

  useEffect(() => {
    if (bookIdxNumber !== null) {
      handleBookDetail(bookIdxNumber);
      bookDetailImg(bookIdxNumber);
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

    e.target.style.height = "25px";
    e.target.style.height = `${e.target.scrollHeight}px`;

    // const scrollHeight = e.target.scrollHeight;
    // setHeight(`${scrollHeight}px`);
  };

  // 작성하기
  const handleInsertReview = () => {
    if (!text.trim()) {
      alert("내용을 작성해주세요");
      textAreaRef.current?.focus();
      return;
    }

    console.log(bookIdxNumber);
    console.log(typeof bookIdxNumber);
    axiosInstance
      .post("/reviewInsert", {
        bookIdx: bookIdxNumber,
        content: text,
      })
      .then((res) => {
        console.log(res.data);
        // setText("");
      })
      .catch((error) => {
        console.log(error);
      });

    // alert("로그인 해주세요");
    // navigate("/member/login");
  };

  return (
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
          {/* <input
            type="text"
            className="detail-review-insert-wrap"
            placeholder="리뷰를 작성해주세요"
          /> */}
          <textarea
            ref={textAreaRef}
            className="detail-review-insert-wrap"
            placeholder="리뷰를 작성해주세요"
            value={text}
            onChange={handleInputChange}
          ></textarea>
          <button className="detail-review-button" onClick={handleInsertReview}>
            작성하기
          </button>
          {/* <div className="detail-review-box">
            <div className="detail-review-img"></div>
            <div className="detail-text-wrap">
              <p>아이디</p>
              <p>#직종 #학생</p>
              <p>
                리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                <br />
                리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                <br />
                리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
                리뷰리뷰리뷰리뷰리뷰리뷰리뷰리뷰
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default MemberKeywordDetail;
