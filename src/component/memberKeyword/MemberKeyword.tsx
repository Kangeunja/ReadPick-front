import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import "../../assets/css/memberKeyword.css";
import KeywordLayout from "../../layouts/keywordLayout/KeywordLayout";

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

interface SearchResult {
  author: string;
  bookName: string;
  bookImageName: String;
  bookIdx: number;
}

const MemberKeyword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // URL에서 bsIdx 쿼리 파라미터 값 추출
  const bsIdx = queryParams.get("bsIdx");
  const bsIdxNumber = bsIdx ? parseInt(bsIdx, 10) : null;

  const bssIdx = queryParams.get("bssIdx");
  const bssIdxNumber = bssIdx ? Number(bssIdx) : null;

  // URL에서 검색 옵션 파라미터 값 추출
  const option = queryParams.get("option");

  const keywordText = queryParams.get("keyword");

  // 키워드 리스트 정보
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

  // 키워드 리스트 토글 유무
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

  // 검색결과 리스트 정보
  const [searchResultList, setSearchResultList] = useState<SearchResult[]>([]);

  // 페이지 로드시 api호출
  useEffect(() => {
    // keywordList();
    // 소분류가 있을떼
    if (bssIdxNumber !== null) {
      // setKeywordToggle(bsIdxNumber);
      setBookList([]);
      setSearchResultList([]);

      axiosInstance
        .get("/bookListByBssIdx", { params: { bssIdx: bssIdx } })
        .then((res) => {
          console.log(res.data);
          setSubBookList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      subBookListImg(bssIdxNumber);
      return;
    }

    // 중분류만 있을때
    if (bsIdxNumber !== null) {
      setSubBookList([]);
      setSearchResultList([]);

      // setKeywordToggle(bsIdxNumber);
      fetchSetClick(bsIdxNumber);
      bookListImg(bsIdxNumber);
    }

    // 검색
    if (option && keywordText) {
      if (option === "도서명") bookNameResult();
      if (option === "작가명") authorResult();
    }
  }, [bsIdxNumber, bssIdxNumber, option, keywordText]);

  // 메인페이지에서 선택한 중분류의 소분류 리스트 api
  // const keywordList = () => {
  //   axiosInstance
  //     .get("/bssListByBsIdx")
  //     .then((res) => {
  //       console.log(res.data);
  //       setKeyword(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // 키워드 리스트 토글 상태
  const handleClickTitle = (bsIdx: number) => {
    setSubBookList([]);
    setSearchResultList([]);
    setKeywordToggle(bsIdx);
    fetchSetClick(bsIdx);
    bookListImg(bsIdx);
    navigate(`/member/keyword?bsIdx=${bsIdx}`);
    // if (keywordToggle === bsIdx) {
    //   setKeywordToggle(null);
    // } else {
    //   setKeywordToggle(bsIdx);
    //   fetchSetClick(bsIdx);
    //   bookListImg(bsIdx);
    //   navigate(`/member/keyword?bsIdx=${bsIdx}`);
    // }
  };

  // 유저가 선택한 소분류 정보 api
  const handleClickSubTitle = (bssIdx: number) => {
    setBookList([]);
    setSearchResultList([]);
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

    navigate(`/member/keyword?bsIdx=${bsIdxNumber}&bssIdx=${bssIdx}`);
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

  // 유저가 선택한 중분류의 책 이미지 리스트 api
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

  // 유저가 선택한 소분류 책 이미지 리스트 api
  const subBookListImg = (bssIdx: number) => {
    axiosInstance
      .get("/bssImageList", {
        params: {
          bssIdx: bssIdx,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSubBookImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 책 상세정보 페이지이동
  const handleBookDetailClick = (bookIdx: number) => {
    // navigate(`/member/keyword/detail/${bookIdx}`);
    let url = `/member/keyword/detail/${bookIdx}?bsIdx=${bsIdx}`;
    if (bssIdx !== null) {
      url += `&bssIdx=${bssIdx}`;
    }
    navigate(url);
  };

  // 도서명으로 검색한 결과 리스트 api
  const bookNameResult = () => {
    setBookList([]);
    setSubBookList([]);
    axiosInstance
      .get("/bookNameSearch", {
        params: { bookName: keywordText },
      })
      .then((res) => {
        console.log(res.data);

        setSearchResultList(res.data);
      })
      .catch((error) => console.log(error));
  };

  // 작가명으로 검색한 결과 리스트 api
  const authorResult = () => {
    setBookList([]);
    setSubBookList([]);
    axiosInstance
      .get("/authorSearch", {
        params: { author: keywordText },
      })
      .then((res) => {
        console.log(res.data);

        setSearchResultList(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="keyword-page">
      <div className="keyword-container">
        <KeywordLayout
          onBsClick={handleClickTitle}
          onBssClick={handleClickSubTitle}
        />

        <div className="keyword-list-page">
          <div className="keyword-list-title">전체{}건</div>
          <div className="keyword-list">
            {searchResultList.length > 0 ? (
              searchResultList.map((item, index) => (
                <div
                  className="keyword-card"
                  key={index}
                  onClick={() => handleBookDetailClick(item.bookIdx)}
                >
                  <div className="keyword-card__image">
                    <img
                      src={item.bookImageName.replace("coversum", "cover500")}
                      alt="책 이미지"
                    />
                  </div>
                  <div className="keyword-card__info">
                    <p className="keyword-card__title">{item.bookName}</p>
                    <p className="keyword-card__author">{item.author}</p>
                  </div>
                </div>
              ))
            ) : keywordText ? (
              <p className="keyword-empty">검색 결과가 없습니다.</p>
            ) : bookList.length > 0 ? (
              bookList.map((item, index) => (
                <div
                  className="keyword-card"
                  key={index}
                  onClick={() => handleBookDetailClick(item.bookIdx)}
                >
                  <div className="keyword-card__image">
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
                  <div className="keyword-card__info">
                    <p className="keyword-card__title">{item.bookName}</p>
                    <p className="keyword-card__author">{item.author}</p>
                  </div>
                </div>
              ))
            ) : subBookList.length > 0 ? (
              subBookList.map((item, index) => (
                <div
                  className="keyword-card"
                  key={index}
                  onClick={() => handleBookDetailClick(item.bookIdx)}
                >
                  <div className="keyword-card__image ">
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
                  <div className="keyword-card__info">
                    <p className="keyword-card__title">{item.bookName}</p>
                    <p className="keyword-card__author">{item.author}</p>
                  </div>
                </div>
              ))
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberKeyword;
