import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../../assets/css/mypagePopup.css";

import profileDefaultImg from "../../assets/img/icon-profile.png";
import TrashImg from "../../assets/img/icon-trash.png";

const MypageInfoPopup = ({ onClose, userInfo, setUserInfo }: any) => {
  const [editableUserInfo, setEditableUserInfo] = useState({
    userName: userInfo.userName,
    nickName: userInfo.nickName,
    email: userInfo.email,
    id: userInfo.id,
    pw: userInfo.pw,
    fileName: userInfo.fileName,
  });

  const [editMode, setEditMode] = useState({
    userName: false,
    nickName: false,
    email: false,
    id: false,
    pw: false,
  });
  const [idCheckMessage, setIdCheckMessage] = useState(""); // 아이디 체크 메세지 추가
  const [passwordCheckMessage, setPasswordCheckMessage] = useState(""); // 비밀번호 확인 메세지 추가
  const [idValId, setIdValId] = useState(true); // 아이디 체크 메세지 색깔
  const [pwValPw, setPwValPw] = useState(true); // 비밀번호 메세지 색깔

  const [isPasswordVisible, setPasswordVisible] = useState(false); // 비밀번호 보이기 상태
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false); // 비밀번호 확인 보이기 상태
  const [idCheck, setIdcheck] = useState(false); // 중복확인버튼 유무
  const [isMessageCancel, setIsMessageCancel] = useState(false);

  const [pwCheck, setPwCheck] = useState(""); // 비밀번호확인용

  const [image, setImage] = useState(profileDefaultImg);

  const userNameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);

  const imgRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";

    // 프로필 이미지 초기화
    if (userInfo.fileName && userInfo.fileName !== "default") {
      setImage(editableUserInfo.fileName);
    } else {
      setImage(profileDefaultImg);
    }
    return () => {
      // 팝업이 닫힐 때 스크롤 복구
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (
    field: keyof typeof editableUserInfo,
    value: string
  ) => {
    setEditableUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    // let newValue = value;
    if (field !== "userName" && field !== "nickName") {
      value = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");
    }
    if (field === "id") {
      setIdCheckMessage("");
      setIdValId(true);
    }
    if (field === "pw") {
      setPasswordCheckMessage("");
      setPwValPw(true);
    }
  };

  const handleEdit = (field: any, ref: React.RefObject<HTMLInputElement>) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: true,
    }));

    if (field === "id") {
      setIdcheck(true);
      setIsMessageCancel(false);
    }

    setTimeout(() => {
      ref.current?.focus();
    });
  };

  const handleSave = () => {
    const isModified =
      editableUserInfo.userName !== userInfo.userName ||
      editableUserInfo.nickName !== userInfo.nickName ||
      editableUserInfo.email !== userInfo.email ||
      editableUserInfo.id !== userInfo.id ||
      editableUserInfo.pw !== userInfo.pw;

    if (!isModified) {
      alert("수정된 내용이 없습니다.");
      return;
    }

    if (editableUserInfo.userName === "") {
      alert("이름을 입력해주세요");
      userNameRef.current?.focus();
      return;
    }
    if (editableUserInfo.nickName === "") {
      alert("닉네임을 입력해주세요");
      nickNameRef.current?.focus();
      return;
    }
    if (editableUserInfo.email === "") {
      alert("이메일을 입력해주세요");
      emailRef.current?.focus();
      return;
    }
    if (idCheck && editableUserInfo.id !== userInfo.id) {
      if (editableUserInfo.id === "") {
        alert("아이디를 입력해주세요");
        idRef.current?.focus();
        return;
      } else if (!idCheckMessage) {
        alert("아이디 중복확인 해주세요");
        return;
      }
    }
    if (!idValId) {
      alert("사용 불가능한 아이디입니다. 다시 입력 후 중복 확인을 해주세요.");
      return;
    }
    if (editableUserInfo.pw === "") {
      alert("비밀번호를 입력해주세요");
      pwRef.current?.focus();
      return;
    }
    if (!passwordCheckMessage) {
      alert("비밀번호확인을 입력해주세요");
      pwCheckRef.current?.focus();
      return;
    }
    if (!pwValPw) {
      alert("일치하지 않은 비밀번호입니다. 다시 입력해주세요");
      return;
    }
    axiosInstance
      .post("/myPage/userInfoModify", {
        userName: editableUserInfo.userName,
        nickName: editableUserInfo.nickName,
        email: editableUserInfo.email,
        id: editableUserInfo.id,
        pw: editableUserInfo.pw,
      })
      .then((res) => {
        console.log(res);
        if (res.data === "success") {
          alert("수정완료되었습니다.");
          setUserInfo(editableUserInfo);
          onClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 아이디 중복확인
  const handleIdCheck = () => {
    if (!editableUserInfo.id.trim()) {
      alert("아이디를 입력해주세요");
      return;
    }
    axiosInstance
      .post(`/checkId?id=${editableUserInfo.id}`)
      .then((res) => {
        if (res.data.result === false) {
          setIdCheckMessage("사용 불가능한 ID 입니다.");
          setIdValId(false);
        } else {
          setIdCheckMessage("사용 가능한 ID 입니다.");
          setIdValId(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 비밀번호 확인
  const handleOnChangePassword = (value: string) => {
    // setEditableUserInfo((prev) => ({
    //   ...prev,
    //   [field]: value,
    // }));
    setPwCheck(value);

    if (value !== editableUserInfo.pw) {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
      setPwValPw(false);
    } else if (value === editableUserInfo.pw) {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setPwValPw(true);
    }
  };

  // 비밀번호 숨기기/보이기 토글 함수
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // 비밀번호확인 숨기기/보이기 토글 함수
  const togglePasswordCheckVisibility = () => {
    setPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  const handleMessageCancel = () => {
    setIdCheckMessage("");
    setIsMessageCancel(false);
    setEditableUserInfo((prev) => ({
      ...prev,
      id: userInfo.id,
    }));
    setIdValId(true);
  };

  // 사진 추가하기
  const handleProfileImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    console.log("선택된 파일:", file);

    axiosInstance
      .post("/userImageInsert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setImage(res.data);
        // editableUserInfo.fileName 업데이트
        setEditableUserInfo((prev) => ({
          ...prev,
          fileName: res.data,
        }));

        // 부모 컴포넌트의 userInfo도 업데이트
        // setUserInfo((prev: any) => ({
        //   ...prev,
        //   fileName: res.data,
        // }));
        alert("사진이 추가되었습니다.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 사진 수정하기
  const handleEditProfileImg = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axiosInstance
      .post("/userImageUpdate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setImage(res.data);
        // editableUserInfo.fileName 업데이트
        setEditableUserInfo((prev) => ({
          ...prev,
          fileName: res.data,
        }));

        // onClose();

        // 부모 컴포넌트의 userInfo도 업데이트
        // setUserInfo((prev: any) => ({
        //   ...prev,
        //   fileName: res.data,
        // }));
        alert("사진이 수정되었습니다.");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //사진 삭제하기
  const handleDeleteProfileImg = () => {
    if (window.confirm("사진을 정말로 삭제하시겠습니까?")) {
      axiosInstance
        .post("/userImageDelete")
        .then((res) => {
          console.log(res.data);
          if (res.data === "success") {
            setImage(profileDefaultImg);

            setEditableUserInfo((prev) => ({
              ...prev,
              fileName: "default",
            }));

            // setUserInfo((prev: any) => ({
            //   ...prev,
            //   fileName: "default",
            // }));
            alert("사진이 삭제되었습니다.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      return;
    }
  };

  const handleClose = () => {
    setUserInfo(editableUserInfo);
    onClose();
  };

  return (
    <div className="mypage-popup">
      <div className="mypage-popup-box">
        <div className="mypage-popup-text">회원정보수정</div>
        <div className="mypage-popup-wrap">
          <div className="mypage-popup-profile-wrap">
            {editableUserInfo.fileName === "default" ? (
              <div className="mypage-popup-profile-box">
                <img
                  src={image}
                  alt="기본 이미지"
                  className="myPage-default-img"
                />
                <div
                  className="mypage-popup-set-box"
                  onClick={() => imgRef.current?.click()}
                >
                  <div className="mypage-popup-set-img"></div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={imgRef}
                    style={{ display: "none" }}
                    onChange={handleProfileImage}
                  />
                </div>
              </div>
            ) : (
              <>
                <img
                  src={editableUserInfo.fileName}
                  alt="프로필 이미지"
                  className="myPage-uploaded-img"
                />
                <div className="myPage-popup-img-correction">
                  <div onClick={() => imgRef.current?.click()}>
                    <button type="button" className="myPage-popup-edit-profile">
                      사진 수정
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={imgRef}
                      style={{ display: "none" }}
                      onChange={handleEditProfileImg}
                    />
                  </div>
                  <button
                    type="button"
                    className="myPage-profile-delete"
                    onClick={handleDeleteProfileImg}
                  >
                    <img src={TrashImg} alt="쓰레기통" />
                  </button>
                </div>
              </>
            )}

            <div
              className="myPage-popup-img-correction"
              // onClick={handleImgCorrection}
            >
              {/* <input type="file" id="input-file" className="file-input" /> */}
              {/* {profileDefaultImg ? (
                <button type="button">사진 추가하기</button>
              ) : (
                <button type="button">사진 수정하기</button>
              )} */}
            </div>
          </div>
          <div className="mypage-popup-con-text">
            <div className="mypage-popup-con-wrap">
              <div className="mypage-popup-con-title">이름</div>
              <input
                ref={userNameRef}
                type="text"
                placeholder={userInfo.userName}
                value={editableUserInfo.userName}
                disabled={!editMode.userName}
                onChange={(e) => handleChange("userName", e.target.value)}
              />

              <button
                type="button"
                onClick={() => handleEdit("userName", userNameRef)}
              >
                수정
              </button>
            </div>
            <div className="mypage-popup-con-wrap">
              <div className="mypage-popup-con-title">닉네임</div>
              <input
                ref={nickNameRef}
                type="text"
                placeholder={userInfo.nickName}
                value={editableUserInfo.nickName}
                disabled={!editMode.nickName}
                onChange={(e) => handleChange("nickName", e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEdit("nickName", nickNameRef)}
              >
                수정
              </button>
            </div>
            <div className="mypage-popup-con-wrap">
              <div className="mypage-popup-con-title">이메일</div>
              <input
                type="text"
                ref={emailRef}
                placeholder={userInfo.email}
                value={editableUserInfo.email}
                disabled={!editMode.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleEdit("email", emailRef)}
              >
                수정
              </button>
            </div>
            <div className="mypage-popup-con-wrap">
              <div className="mypage-popup-con-title">아이디</div>
              <input
                type="text"
                ref={idRef}
                onCopy={(e) => e.preventDefault()}
                placeholder={userInfo.id}
                value={editableUserInfo.id}
                disabled={!editMode.id}
                onChange={(e) => handleChange("id", e.target.value)}
              />
              <div className="mypage-button-wrap">
                <button type="button" onClick={() => handleEdit("id", idRef)}>
                  수정
                </button>
                {idCheck && (
                  <button type="button" onClick={handleIdCheck}>
                    중복확인
                  </button>
                )}
              </div>
              <div className="mypage-message-wrap">
                {idCheckMessage && (
                  <p
                    className={`mypage-id-CheckMessage ${
                      idValId ? "success" : "error"
                    }`}
                  >
                    {idCheckMessage}
                  </p>
                )}
                {idCheckMessage && (
                  <button type="button" onClick={handleMessageCancel}>
                    수정취소
                  </button>
                )}
              </div>
            </div>
            <div className="mypage-popup-con-wrap">
              <div className="mypage-popup-con-title">비밀번호</div>
              <input
                type={isPasswordVisible ? "text" : "password"}
                ref={pwRef}
                onCopy={(e) => e.preventDefault()}
                // placeholder={userInfo.pw}
                value={editableUserInfo.pw}
                disabled={!editMode.pw}
                onChange={(e) => handleChange("pw", e.target.value)}
              />

              {!isPasswordVisible ? (
                <div className="mypage-toggle-visibility">
                  <AiFillEyeInvisible onClick={togglePasswordVisibility} />
                </div>
              ) : (
                <div className="mypage-toggle-visibility">
                  <AiFillEye onClick={togglePasswordVisibility} />
                </div>
              )}
              <button type="button" onClick={() => handleEdit("pw", pwRef)}>
                수정
              </button>
            </div>

            <div className="mypage-popup-con-wrap">
              <div className="mypage-popup-con-title">비밀번호확인</div>
              <input
                type={isPasswordConfirmVisible ? "text" : "password"}
                ref={pwCheckRef}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                // placeholder={userInfo.pw}
                // value={editableUserInfo.pw}
                // disabled={!editMode.pw}
                onChange={(e) => handleOnChangePassword(e.target.value)}
              />
              {!isPasswordConfirmVisible ? (
                <div className="mypage-toggle-visibility">
                  <AiFillEyeInvisible onClick={togglePasswordCheckVisibility} />
                </div>
              ) : (
                <div className="mypage-toggle-visibility">
                  <AiFillEye onClick={togglePasswordCheckVisibility} />
                </div>
              )}

              {/* <button
                type="button"
                onClick={() => handleEdit("pwCheck", pwCheckRef)}
              >
                수정
              </button> */}

              {passwordCheckMessage && (
                <p
                  className={`mypage-member-pwCheck ${
                    pwValPw ? "success" : "error"
                  }`}
                >
                  {passwordCheckMessage}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          className="mypage-popup-save"
          onClick={handleSave}
        >
          저장하기
        </button>
        <button
          type="button"
          className="mypage-popup-cancel"
          onClick={handleClose}
          // onClick={() => onClose()}
        ></button>
      </div>
    </div>
  );
};
export default MypageInfoPopup;
