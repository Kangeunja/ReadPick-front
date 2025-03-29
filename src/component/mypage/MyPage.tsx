import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import MypageInfoPopup from "../popup/MypageInfoPopup";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
  });
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [userPick, setUserPick] = useState([
    {
      bookName: "",
      author: "",
    },
  ]);
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

  const userInfos = () => {
    axiosInstance
      .post("/userInfo", {})
      .then((res) => {
        console.log("res", res.data);
        setUserInfo(res.data);
      })
      .catch((error) => {
        console.log(error.response?.status);
      });
  };

  const userPickBook = () => {
    axiosInstance
      .post("/userPickBookList", {})
      .then((res) => {
        console.log(res.data);
        setUserPick(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userPickBookImg = () => {
    axiosInstance
      .post("/bookmarkImageList", {})
      .then((res) => {
        console.log(res.data);
        setUserBookImg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="mypage-wrap">
        <div className="mypage-title">
          <p>마이페이지설명마이페이지설명</p>
          <p>마이페이지 PICK</p>
        </div>
        <div className="mypage-info">
          <div className="mypage-profile-wrap">
            <div className="mypage-img-wrap">
              <div className="mypage-img"></div>
            </div>
            <button
              className="mypage-button"
              onClick={() => setIsShowPopup(true)}
            >
              회원정보수정
            </button>
          </div>
          <div className="mypage-text-wrap">
            <p>
              <span>{userInfo.userName}</span>님,
              <br />
              마이페이지에 오신걸 환영합니다!
            </p>
          </div>
        </div>
        <div className="mypage-list">
          <div className="mypage-list-title">찜목록</div>
          <div className="mypage-list-wrap">
            <div className="mypage-box">
              {userPick.map((item, index) => (
                <div className="mypage-box-wrap">
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
              ))}
            </div>
          </div>

          {/* {userPick.map((item, index) => (
            <div className="mypage-box">
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
          ))} */}

          {/* <div className="mypage-box">
              <div className="mypage-list-img">
                {userBookImg.map((item) => (
                  <img
                    src={item?.fileName.replace("coversum", "cover500")}
                    alt="책 이미지"
                  />
                ))}
              </div>
              {userPick.map((item, index) => (
                <div key={index} className="mypage-text">
                  <p>{item.bookName}</p>
                  <p>{item.author}</p>
                </div>
              ))}
            </div> */}
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
