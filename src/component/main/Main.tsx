import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../../assets/css/mainPage.css";

const Main = () => {
  const navigate = useNavigate();
  const [keyList, setKeyList] = useState([
    {
      bsIdx: 0,
      bsName: "",
    },
  ]);
  const [todayBookData, setTodayBookData] = useState({
    content: "",
    bookName: "",
    author: "",
    bookImageName: "",
    bookIdx: 0,
  });

  const handleKeyWordIdx = (bsIdx: number) => {
    navigate(`/member/keyword?bsIdx=${bsIdx}`);
  };

  // const handleKeyWord = (bsIdx: any) => {
  //   axiosInstance
  //     .get("/bssListByBsIdx", {
  //       params: { bsIdx: bsIdx },
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       // navigate("/member/keyword");
  //       navigate(`/member/keyword?bsIdx=${bsIdx}`);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // 메인페이지 keywordList
  useEffect(() => {
    keywordList();
    todayBook();
  }, []);

  const keywordList = () => {
    axiosInstance
      .get("/bsList")
      .then((res) => {
        setKeyList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 오늘의 도서 api
  const todayBook = () => {
    axiosInstance
      .get("/todayBook")
      .then((res) => {
        console.log(res.data);
        setTodayBookData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 오늘의 책 보러가기
  const handleTodayBook = (bookIdx: number) => {
    navigate(`/member/keyword/detail/${bookIdx}`);
  };

  return (
    <>
      <div className="main-content">
        <div className="main-container">
          <div className="main-left-con">
            <div className="main-text-wrap">
              <p>
                <span>READPICK</span>이 추천하는
              </p>
              <p>오늘의 도서</p>
              <p>{todayBookData.content}</p>
            </div>
            <button
              type="button"
              className="main-button"
              onClick={() => handleTodayBook(todayBookData.bookIdx)}
            >
              오늘의 책 보러가기
            </button>
          </div>
          <div className="main-right-con">
            <div className="main-right-img">
              <img
                src={todayBookData.bookImageName.replace(
                  "coversum",
                  "cover500"
                )}
                alt="책 이미지"
              />
            </div>
            <div className="main-right-text">
              <p>{todayBookData.bookName}</p>
              <p>{todayBookData.author}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="top-content">
        <div className="top-text-wrap">
          <p>키워드별로 찾아볼수 있습니다.</p>
          <p>KEYWORD</p>
        </div>
        <div className="top_con-wrap">
          {keyList.map((item) => (
            <div
              key={item.bsIdx}
              className="top-con-box"
              onClick={() => handleKeyWordIdx(item.bsIdx)}
            >
              {item.bsName}
            </div>
          ))}
        </div>
      </div>

      <div className="book-content">
        <div className="book-text-wrap">
          <p>추천도서</p>
          <p>
            <span>READ PICK</span>에서 유저가 선택한 관심사 기반으로 도서를
            추천합니다.
          </p>
        </div>
        <div className="book-more-wrap">
          <button className="book-more-button"></button>
          <div className="book-more-text">more</div>
        </div>

        <div className="book-con-wrap">
          <div className="">
            <div className="book-con-box"></div>
            <div className="book-title-wrap">
              <p>책제목</p>
              <p>저자</p>
            </div>
            <div className="book-con-right"></div>
          </div>
        </div>
      </div>

      <div className="center-wrap">
        <div className="center-text">
          <p>
            차별화된 도서 리뷰 시스템, <br />
            지금 바로 만나보세요!
          </p>
          <p>책의 간단한 줄거리와 리뷰를 통해 취향껏 만나볼수 있습니다.</p>
        </div>
      </div>

      <div className="bottom-content">
        <div>
          <div className="bottom-left-wrap">
            <div className="bottom-icon-wrap">
              <div className="bottom-left-icon"></div>
              <div className="bottom-left-title">찜기능</div>
            </div>
            <div className="bottom-left-text">
              책의 리뷰와 줄거리를 통해
              <br />
              맘에 들면 저장할수 있습니다.
            </div>
          </div>
          <div className="bottom-right-wrap">
            <div className="bottom-book"></div>
            <div className="bottom-title-wrap">
              <p>책제목</p>
              <p>저자</p>
            </div>
            <div className="bottom-right-icons">
              <div className="icon-good"></div>
              <div className="icon-like-hover"></div>
              <div className="icon-pointer"></div>
            </div>
          </div>
        </div>

        <div className="bottom-wrap">
          <div className="bottom-left-box">
            <div className="bottom-book"></div>
            <div className="bottom-title-wrap">
              <p>책제목</p>
              <p>저자</p>
            </div>
            <div className="bottom-right-icons">
              <div className="icon-good-hover"></div>
              <div className="icon-like"></div>
              <div className="icon-pointer-hover"></div>
            </div>
          </div>

          <div className="bottom-right-box">
            <div className="bottom-icon-wrap">
              <div className="bottom-left-icon"></div>
              <div className="bottom-left-title">추천기능</div>
            </div>
            <div className="bottom-left-text">
              다른사람에게 책을 추천하고 싶을때 <br />
              해당 기능을 통해 추천할수 있습니다.
            </div>
          </div>
        </div>
        <div className="bottom-icon-book"></div>
      </div>
    </>
  );
};

export default Main;
