import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../../assets/css/main.css";

const Main = () => {
  const navigate = useNavigate();

  // 키워드 리스트
  const [keyList, setKeyList] = useState([
    {
      bsIdx: 0,
      bsName: "",
    },
  ]);

  // 오늘의 책 정보
  const [todayBookData, setTodayBookData] = useState({
    content: "",
    bookName: "",
    author: "",
    bookImageName: "",
    bookIdx: 0,
  });

  // 추천도서 정보
  const [genreBook, setGenreBook] = useState([
    {
      bookName: "",
      author: "",
      bookImageName: "",
      bookIdx: 0,
    },
  ]);

  const handleKeyWordIdx = (bsIdx: number) => {
    navigate(`/member/keyword?bsIdx=${bsIdx}`);
  };

  // 화면 진입하자마자 실행되는 코드
  useEffect(() => {
    window.scrollTo(0, 0);
    keywordList();
    todayBook();
    userGenreBookList();
  }, []);

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

  // 키워드 리스트 api
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

  // 추천도서 api
  const userGenreBookList = () => {
    axiosInstance
      .get("/userGenreBook")
      .then((res) => {
        console.log(res.data);
        setGenreBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBookDetail = (bookIdx: number) => {
    navigate(`/member/keyword/detail/${bookIdx}`);
  };

  return (
    <div className="main">
      <div className="main-content-wrap">
        <div className="main-content">
          <div className="main-text-wrap">
            <p>READPICK이 추천하는</p>
            <p>오늘의 도서</p>
            {todayBookData && (
              <button onClick={() => handleTodayBook(todayBookData.bookIdx)}>
                오늘의 책 보러가기
              </button>
            )}
          </div>

          {todayBookData ? (
            <div className="main-img">
              <img
                src={todayBookData.bookImageName.replace(
                  "coversum",
                  "cover500"
                )}
                alt="책 이미지"
              />
              <p>{todayBookData.bookName}</p>
              <p>{todayBookData.content}</p>
            </div>
          ) : (
            <p className="main-center-text">
              오늘의 책이 아직 준비되어 있지 않았어요!{" "}
            </p>
          )}

          <div className="main-right-img">
            <div className="main-books-img"></div>
            <div className="main-women-img"></div>
          </div>
        </div>
      </div>

      <div className="main-keyword-content">
        <div className="main-keyword-text">
          <p>키워드별로 찾아볼수 있습니다.</p>
          <p>KEYWORD</p>
        </div>
        <div className="main_keyword-wrap">
          {keyList.map((item) => (
            <div
              key={item.bsIdx}
              className="main_keyword-box"
              onClick={() => handleKeyWordIdx(item.bsIdx)}
            >
              {item.bsName}
            </div>
          ))}
        </div>
      </div>

      <div className="main-book-content">
        <div className="main-book-text">
          <p>추천도서</p>
          <p>READ PICK에서 유저가 선택한 관심사 기반으로 도서를 추천합니다.</p>
        </div>

        {genreBook.length > 0 ? (
          genreBook.map((item, index) => (
            <>
              <div key={index} onClick={() => handleBookDetail(item.bookIdx)}>
                <div className="main-book-box">
                  <img
                    src={item.bookImageName.replace("coversum", "cover500")}
                    alt="책 이미지"
                  />
                </div>
                <div className="main-book-title">
                  <p>{item.bookName}</p>
                  <p>{item.author}</p>
                </div>
              </div>
            </>
          ))
        ) : (
          <div>유저가 선택한 추천 도서가 없습니다.</div>
        )}
      </div>

      <div className="main-system-wrap">
        <div className="main-system-box1"></div>
        <div className="main-system-text">
          <p>
            세련된 도서 리뷰 시스템, <br />
            지금 바로 만나보세요!
          </p>
          <p>책의 간단한 줄거리와 리뷰를 통해 취향껏 만나볼수 있습니다.</p>
        </div>
        <div className="main-system-box2"></div>
      </div>

      <div className="main-function-wrap">
        <div className="main-function-box">
          <div className="main-function-con"></div>
          <div className="main-function-icon-wrap">
            <div className="main-function-good main-good-img1"></div>
            <div className="main-function-recomend main-recomend-img1"></div>
          </div>

          <div className="main-function-text">
            <p>찜기능</p>
            <p>
              책의 리뷰와 줄거리를 통해 <br />
              맘에 들면 저장할수 있습니다.
            </p>
          </div>
        </div>

        <div className="main-function-box">
          <div className="main-function-con"></div>
          <div className="main-function-icon-wrap">
            <div className="main-function-good main-good-img2"></div>
            <div className="main-function-recomend main-recomend-img2"></div>
          </div>

          <div className="main-function-text">
            <p>추천기능</p>
            <p>
              다른사람에게 책을 추천하고 싶을때 <br />
              해당 기능을 통해 추천할수 있습니다.
            </p>
          </div>
        </div>
        <div className="main-function-box">
          <div className="main-function-bottom">
            <div className="main-function-circle"></div>
            <div className="main-function-bottom-text">
              <p>아이디</p>
              <p>
                이 책은 이제 막 취업준비하는
                <br />
                준비생들에게 도움이 많이될것같다.
              </p>
            </div>
          </div>

          <div className="main-function-text">
            <p>리뷰기능</p>
            <p>
              다른사람에게 후기를 남겨주고 싶을때 <br />
              해당 기능을 통해 리뷰를 남길수 있습니다.
            </p>
          </div>
        </div>
        <div className="main-function-box">
          <div className="main-function-bottom">
            <p>찜목록</p>
            <div className="main-function-bottom-box-wrap">
              <div className="main-function-bottom-box"></div>
              <div className="main-function-bottom-box-text">
                <p>책제목</p>
                <p>지은이</p>
              </div>
            </div>
            <div className="main-function-bottom-box-wrap">
              <div className="main-function-bottom-box"></div>
              <div className="main-function-bottom-box-text">
                <p>책제목</p>
                <p>지은이</p>
              </div>
            </div>
            <div className="main-function-bottom-box-wrap">
              <div className="main-function-bottom-box"></div>
              <div className="main-function-bottom-box-text">
                <p>책제목</p>
                <p>지은이</p>
              </div>
            </div>
          </div>

          <div className="main-function-text">
            <p>마이페이지기능</p>
            <p>
              회원정보를 수정할수 있고 찜해놨던 <br />
              책목록들을 이 기능을 통해 확인할수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
