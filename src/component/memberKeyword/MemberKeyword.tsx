import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/memberKeyword.css";

interface BookNames {
  bookName: string;
  author: string;
  bookIdx: number;
}

interface SubBookNames {
  bookName: string;
  author: string;
  bookIdx: number;
}

const MemberKeyword = () => {
  // URL에서 bsIdx 쿼리 파라미터 값 추출
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bsIdx = queryParams.get("bsIdx");
  const bsIdxNumber = bsIdx ? parseInt(bsIdx, 10) : null;

  const navigate = useNavigate();

  // 키워드 메뉴
  const [keyword, setKeyword] = useState([
    {
      bsIdx: 0,
      bsName: "",
      bssList: [
        {
          bssName: "",
          bssIdx: 0,
        },
      ],
    },
  ]);

  // 키워드 소분류 메뉴
  const [keywordToggle, setKeywordToggle] = useState<number | null>(null);

  // 책 정보
  const [bookList, setBookList] = useState<BookNames[]>([]);

  // 소분류 책 정보
  const [subBookList, setSubBookList] = useState<SubBookNames[]>([]);

  // 키워드 책 이미지
  const [bookImg, setBookImg] = useState([
    {
      fileName: "",
    },
  ]);

  // 키워드 소분류 책 이미지
  const [subBookImg, setSubBookImg] = useState([
    {
      fileName: "",
    },
  ]);

  // 페이지 로드시 api호출
  useEffect(() => {
    keywordList();
    if (bsIdxNumber !== null) {
      setKeywordToggle(bsIdxNumber);
      fetchSetClick(bsIdxNumber);
      bookListImg(bsIdxNumber);
    }
  }, [bsIdxNumber]);

  // 키워드 리스트 api
  const keywordList = () => {
    axiosInstance
      .get("/bssListByBsIdx")
      .then((res) => {
        console.log(res.data);
        setKeyword(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 키워드 메뉴 api
  const handleClickTitle = (bsIdx: number) => {
    setSubBookList([]);
    if (keywordToggle === bsIdx) {
      setKeywordToggle(null);
    } else {
      setKeywordToggle(bsIdx);
      fetchSetClick(bsIdx);
      bookListImg(bsIdx);
    }
  };

  // 키워드 소분류 메뉴 api
  const handleClickSubTitle = (bssIdx: number) => {
    setBookList([]);
    subBookListImg(bssIdx);
    axiosInstance
      .get("/bookListByBssIdx", { params: { bssIdx: bssIdx } })
      .then((res) => {
        console.log(res.data);
        setSubBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 책 정보 api
  const fetchSetClick = (bsIdx: number) => {
    axiosInstance
      .get("/bookListByBsIdx", {
        params: {
          bsIdx: bsIdx,
        },
      })
      .then((res) => {
        console.log(res.data);
        setBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 키워드 책 이미지 api
  const bookListImg = (bsIdx: number) => {
    axiosInstance
      .get("/bsImageList", {
        params: {
          bsIdx: bsIdx,
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

  // 키워드 소분류 책 이미지 api
  const subBookListImg = (bssIdx: number) => {
    axiosInstance
      .get("/bssImageList", {
        params: {
          bssIdx: bssIdx,
        },
      })
      .then((res) => {
        console.log(res);
        setSubBookImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 책 정보 url api
  const handleBookDetailClick = (bookIdx: number) => {
    navigate(`/member/keyword/detail/${bookIdx}`);
  };

  return (
    <div className="keyword-content-wrap">
      <div className="keyword-text-wrap">
        <p>키워드별로 찾아볼수 있습니다.</p>
        <p>KEYWORD</p>
      </div>
      <div>
        <div className="keyword-nav-wrap">
          {keyword.map((item) => (
            <div key={item.bsIdx}>
              <div
                className="keyword-nav-title"
                onClick={() => handleClickTitle(item.bsIdx)}
              >
                {item.bsName}
              </div>
              {keywordToggle === item.bsIdx && (
                <ul className="keyword-nav-sub">
                  {item.bssList.map((bssList, index) => (
                    <li
                      key={index}
                      onClick={() => handleClickSubTitle(bssList.bssIdx)}
                    >
                      {bssList.bssName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="keyword-bookList-wrap">
          {bookList.length > 0 && (
            <>
              {bookList.map((item, index) => (
                <div
                  className="keyword-box"
                  key={index}
                  onClick={() => handleBookDetailClick(item.bookIdx)}
                >
                  <div className="keyword-img">
                    {bookImg[index] && (
                      <img
                        src={bookImg[index]?.fileName.replace(
                          "coversum",
                          "cover500"
                        )}
                        alt="책 이미지"
                      />
                    )}
                  </div>
                  <div className="keyword-text">
                    <p>{item.bookName}</p>
                    <p>{item.author}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {subBookList.length > 0 && (
            <>
              {subBookList.map((item, index) => (
                <div
                  className="keyword-box"
                  key={index}
                  onClick={() => handleBookDetailClick(item.bookIdx)}
                >
                  <div className="keyword-img">
                    {subBookImg[index] && (
                      <img
                        src={subBookImg[index]?.fileName.replace(
                          "coversum",
                          "cover500"
                        )}
                        alt="책 이미지"
                      />
                    )}
                  </div>
                  <div className="keyword-text">
                    <p>{item.bookName}</p>
                    <p>{item.author}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MemberKeyword;
