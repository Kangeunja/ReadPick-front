import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import MypageInfoPopup from "../popup/MypageInfoPopup";
import { useNavigate } from "react-router-dom";
import "../../assets/css/myPage.css";
import profileDefaultImg from "../../assets/img/icon-profile.png";

const MyPage = () => {
  const navigate = useNavigate();

  // 회원정보
  const [userInfo, setUserInfo] = useState({
    userName: "",
    fileName: "",
  });

  // 회원정보 수정 팝업
  const [isShowPopup, setIsShowPopup] = useState(false);

  // 회원이 선택한 찜 리스트
  const [userPick, setUserPick] = useState([
    {
      bookName: "",
      author: "",
      bookIdx: 0,
    },
  ]);

  // 찜 리스트들의 책 이미지
  const [userBookImg, setUserBookImg] = useState([
    {
      fileName: "",
    },
  ]);

  useEffect(() => {
    userInfos();
    userPickBook();
    userPickBookImg();
  }, []);

  // 회원정보 api
  const userInfos = () => {
    axiosInstance
      .post("/myPage/userInfo", {})
      .then((res) => {
        console.log("res", res.data);
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log(error.response?.status);
      });
  };

  // 유저가 선택한 찜 리스트 api
  const userPickBook = () => {
    axiosInstance
      .post("/myPage/userPickBookList", {})
      .then((res) => {
        console.log(res.data);
        setUserPick(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 회원이 선택한 찜 리스트들의 책 이미지 api
  const userPickBookImg = () => {
    axiosInstance
      .post("/myPage/bookmarkImageList", {})
      .then((res) => {
        console.log(res.data);
        setUserBookImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 찜 목록중에 선택한 책 상세정보 이동
  const handleBookList = (bookIdx: number) => {
    navigate(`/member/keyword/detail/${bookIdx}`);
  };

  return (
    <>
      <div className="mypage-con-wrap">
        <div className="mypage-title">
          <p>마이페이지</p>
        </div>
        <div className="mypage-info-wrap">
          <div className="mypage-info-top-wrap">
            <div className="mypage-info-img-box">
              <img
                src={
                  userInfo.fileName === "default"
                    ? profileDefaultImg
                    : userInfo.fileName
                }
                className={
                  userInfo.fileName === "default"
                    ? "mypage-default-img"
                    : "mypage-img"
                }
                alt="이미지"
              />
            </div>

            <div className="mypage-text-wrap">
              <p>
                <span>{userInfo.userName}</span>님,
                <br />
                마이페이지에 오신걸 환영합니다!
              </p>
            </div>
          </div>

          <button
            className="mypage-button"
            onClick={() => setIsShowPopup(true)}
          >
            회원정보수정
          </button>
        </div>
        <div className="mypage-list-wrap">
          <div className="mypage-list-title">찜목록</div>
          <div className="mypage-list-box">
            {userPick.length > 0 ? (
              userPick.map((item, index) => (
                <div
                  key={index}
                  className="mypage-box-wrap"
                  onClick={() => handleBookList(item.bookIdx)}
                >
                  <div className="mypage-list-img">
                    {userBookImg[index] && (
                      <img
                        src={userBookImg[index]?.fileName.replace(
                          "coversum",
                          "cover500"
                        )}
                        alt="책 이미지"
                      />
                    )}
                  </div>
                  <div className="mypage-text">
                    <p>{item.bookName}</p>
                    <p>{item.author}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>유저가 찜한 도서가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
      {isShowPopup && (
        <MypageInfoPopup
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          onClose={() => setIsShowPopup(false)}
        />
      )}
    </>
  );
};

export default MyPage;
