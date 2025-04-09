import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [keywordToggle, setKeywordToggle] = useState<number | null>(null);
  const [bookImg, setBookImg] = useState([
    {
      fileName: "",
    },
  ]); // 중분류 이미지
  const [subBookImg, setSubBookImg] = useState([
    {
      fileName: "",
    },
  ]); // 소분류 이미지
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
  const [bookList, setBookList] = useState<BookNames[]>([]);
  const [subBookList, setSubBookList] = useState<SubBookNames[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 페이지 로드시 api호출
    if (bsIdxNumber !== null) {
      setKeywordToggle(bsIdxNumber);
      fetchSetClick(bsIdxNumber);
      bookListImg(bsIdxNumber);
    }
    axiosInstance
      .get("/bssListByBsIdx")
      .then((res) => {
        console.log(res.data);
        setKeyword(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bsIdxNumber]);

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

  // 책 상세정보
  const handleBookDetailClick = (bookIdx: number) => {
    // if (bookIdx === null || bookIdx === undefined) return;
    navigate(`/member/keyword/detail/${bookIdx}`);
  };

  return (
    <>
      <div className="keyword-wrap">
        <div className="keyword-container">
          <p>키워드설명키워드설명</p>
          <p>키워드 PICK</p>
        </div>
        <div className="keyword-con-wrap">
          <div className="keyword-nav">
            {keyword.map((item) => (
              <div key={item.bsIdx}>
                <div
                  className="keyword-nav-title"
                  onClick={() => handleClickTitle(item.bsIdx)}
                >
                  {item.bsName}
                </div>
                {keywordToggle === item.bsIdx && (
                  <ul
                    className="keyword-nav-sub"
                    // className={`keyword-nav-sub ${
                    //   keywordToggle === item.bsIdx ? "open" : ""
                    // }`}
                  >
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

          <div className="keyword-box-wrap">
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
                        // <img src={bookImg[index].fileName} alt="책 이미지" />
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
    </>
  );
};
export default MemberKeyword;
