import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const MypageInfoPopup = ({ onClose, userInfo, setUserInfo }: any) => {
  const [editableUserInfo, setEditableUserInfo] = useState({
    userName: userInfo.userName,
    nickName: userInfo.nickName,
    email: userInfo.email,
    id: userInfo.id,
    pw: userInfo.pw,
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

  const userNameRef = useRef<HTMLInputElement>(null);
  const nickNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);
  const pwCheckRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 팝업이 열릴 때 body의 스크롤 막기
    document.body.style.overflow = "hidden";
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
      .post("/userInfoModify", {
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

  return (
    <div className="mypage-popup">
      <div className="myPage-box">
        <div className="mypage-popup-text">회원정보수정</div>
        <div className="mypage-popup-wrap">
          <div className="mypage-popup-profile-wrap">
            <div className="mypage-popup-profile-box">
              <div className="mypage-popup-profile-img"></div>
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
          onClick={() => onClose()}
        ></button>
      </div>
    </div>
  );
};
export default MypageInfoPopup;
