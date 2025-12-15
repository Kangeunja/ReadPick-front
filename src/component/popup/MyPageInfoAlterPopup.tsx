import { useEffect, useRef, useState } from "react";
import "../../assets/css/mypageInfoAlterPopup.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const MyPageInfoAlterPopup = ({ onClose, editableUserInfo }: any) => {
  console.log(editableUserInfo.pw);
  // 현재 비밀번호 입력창
  const [currentPw, setCurrentPw] = useState("");

  // 현재 비밀번호 메시지 상태
  const [currentPwMessage, setCurrentPwMessage] = useState("");

  // 현재 비밀번호 메시지 색깔
  const [currentPwVaild, setCurrentPwValid] = useState(true);

  // 새 비밀번호 입력창
  const [newPw, setNewPw] = useState("");

  // 새 비밀번호 메시지 상태
  const [newPwMessage, setNewPwMessage] = useState("");

  // 새 비밀번호 메시지 색깔
  const [newPwVaild, setNewPwValid] = useState(true);

  // 새 비밀번호 확인 입력창
  const [newPwCheck, setNewPwCheck] = useState("");

  // 새 비밀번호 확인 메시지 상태
  const [newPwCheckMessage, setNewPwCheckMessage] = useState("");

  // 새 비밀번호 확인 메시지 색깔
  const [newPwCheckVaild, setNewPwCheckValid] = useState(true);

  // 비밀번호 확인 보이기 상태
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  // 현재 비밀번호 포커싱
  const pwRef = useRef<HTMLInputElement>(null);

  // 새 비밀번호 포커싱
  const newPwRef = useRef<HTMLInputElement>(null);

  // 비밀번호확인 숨기기/보이기 토글 함수
  const togglePasswordCheckVisibility = () => {
    setPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

  const isNewPwCheckDisabled =
    !newPw || newPw === editableUserInfo.pw || !newPwVaild;

  // 페이지 진입시 처음 실행
  useEffect(() => {
    pwRef.current?.focus();
    if (!newPw) {
      setNewPwCheck("");
      setNewPwCheckMessage("");
      setNewPwCheckValid(true);
    }
  }, []);

  const handleChange = (field: keyof typeof editableUserInfo, value: any) => {
    const normalized = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, "");

    // 상태 업데이트
    if (field === "current") setCurrentPw(normalized);
    else if (field === "new") setNewPw(normalized);
    else if (field === "newCheck") setNewPwCheck(normalized);

    // 빈값 처리
    if (!normalized) {
      if (field === "current") {
        setCurrentPwMessage("");
        setCurrentPwValid(true);
      } else if (field === "new") {
        setNewPwMessage("");
      } else {
        setNewPwCheckMessage("");
      }
      return;
    }

    // 유효성 검사
    if (field === "current") {
      setCurrentPw(normalized);
      if (editableUserInfo.pw === normalized) {
        setCurrentPwMessage("비밀번호가 일치합니다.");
        setCurrentPwValid(true);
      } else {
        setCurrentPwMessage("비밀번호가 일치하지 않습니다.");
        setCurrentPwValid(false);
      }
    }

    if (field === "new") {
      setNewPw(normalized);
      if (normalized === editableUserInfo.pw) {
        setNewPwMessage("현재 비밀번호와 일치합니다.");
        setNewPwValid(false);
      } else if (normalized.length < 5) {
        setNewPwMessage("비밀번호는 최소 5자리 이상이어야 합니다.");
        setNewPwValid(false);
      } else {
        setNewPwMessage("사용가능한 비밀번호입니다.");
        setNewPwValid(true);
      }
    }

    if (field === "newCheck") {
      setNewPwCheck(normalized);
      if (normalized === newPw) {
        setNewPwCheckMessage("입력한 비밀번호와 일치합니다.");
        setNewPwCheckValid(true);
      } else if (normalized === editableUserInfo.pw) {
      } else {
        setNewPwCheckMessage("입력한 비밀번호와 일치하지 않습니다.");
        setNewPwCheckValid(false);
      }
    }

    // 실시간 유효성 체크
    // if (normalized.length < 8) {
    //   setCurrentPwMessage("비밀번호는 최소 8자리여야 합니다.");
    //   setCurrentPwValid(false);
    // } else {
    //   setCurrentPwMessage("");
    //   setCurrentPwValid(true);
    // }
  };

  // 취소버튼
  const handleClose = () => {
    onClose(false);
  };

  // 확인버튼
  const handleConfirm = () => {
    if (!currentPw) {
      alert("현재 비밀번호를 입력해주세요.");
      pwRef.current?.focus();
    }
    if (!newPw) {
      alert("새 비밀번호를 입력해주세요.");
      newPwRef.current?.focus();
    }
    // if (editableUserInfo.pw === checkPw) {
    //   // onClose(true);
    //   onClose(targetField);
    // } else {
    //   setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
    //   setPwValPw(false);
    //   pwRef.current?.focus();
    // }
  };

  return (
    <div className="mypageInfoAlter-wrap">
      <div className="mypageInfoAlter-box">
        <div className="mypageInfoAlter-title">비밀번호 변경</div>
        <div className="mypageInfoAlter-input-wrap">
          <div className="mypageInfoAlter-input-box">
            <p>현재 비밀번호</p>
            <input
              ref={pwRef}
              // onChange={handleChange}
              onChange={(e) => handleChange("current", e.target.value)}
              type={isPasswordConfirmVisible ? "text" : "password"}
              className="mypageInfoAlter-input"
              maxLength={15}
              value={currentPw}
            />
            {!isPasswordConfirmVisible ? (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEyeInvisible onClick={togglePasswordCheckVisibility} />
              </div>
            ) : (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEye onClick={togglePasswordCheckVisibility} />
              </div>
            )}
          </div>
          {currentPwMessage && (
            <p
              className={`mypageInfoAlter-popup-member-pwCheck ${
                currentPwVaild ? "success" : "error"
              }`}
            >
              {currentPwMessage}
            </p>
          )}
        </div>

        <div className="mypageInfoAlter-input-wrap">
          <div className="mypageInfoAlter-input-box">
            <p>새 비밀번호</p>
            <input
              ref={newPwRef}
              onChange={(e) => handleChange("new", e.target.value)}
              type={isPasswordConfirmVisible ? "text" : "password"}
              className="mypageInfoAlter-input"
              maxLength={15}
              value={newPw}
            />
            {!isPasswordConfirmVisible ? (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEyeInvisible onClick={togglePasswordCheckVisibility} />
              </div>
            ) : (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEye onClick={togglePasswordCheckVisibility} />
              </div>
            )}
          </div>
          {newPwMessage && (
            <p
              className={`mypageInfoAlter-popup-member-pwCheck ${
                newPwVaild ? "success" : "error"
              }`}
            >
              {newPwMessage}
            </p>
          )}
        </div>

        <div className="mypageInfoAlter-input-wrap">
          <div className="mypageInfoAlter-input-box">
            <p>새 비밀번호 확인</p>
            <input
              onChange={(e) => handleChange("newCheck", e.target.value)}
              type={isPasswordConfirmVisible ? "text" : "password"}
              className="mypageInfoAlter-input"
              maxLength={15}
              value={newPwCheck}
              disabled={isNewPwCheckDisabled}
            />
            {!isPasswordConfirmVisible ? (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEyeInvisible onClick={togglePasswordCheckVisibility} />
              </div>
            ) : (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEye onClick={togglePasswordCheckVisibility} />
              </div>
            )}
          </div>

          {newPwCheckMessage && (
            <p
              className={`mypageInfoAlter-popup-member-pwCheck ${
                newPwCheckVaild ? "success" : "error"
              }`}
            >
              {newPwCheckMessage}
            </p>
          )}
        </div>

        {/* <div className="mypageInfoAlter-input-wrap">
          <p>새 비밀번호</p>
          <div className="mypageInfoAlter-input-box">
            <input
              onChange={(e) => handleChange("new", e.target.value)}
              type={isPasswordConfirmVisible ? "text" : "password"}
              className="mypageInfoAlter-input"
              maxLength={15}
              value={newPw}
            />
            {!isPasswordConfirmVisible ? (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEyeInvisible onClick={togglePasswordCheckVisibility} />
              </div>
            ) : (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEye onClick={togglePasswordCheckVisibility} />
              </div>
            )}
          
          </div>
        </div> */}

        {/* <div className="mypageInfoAlter-input-wrap">
          <p>새 비밀번호 확인</p>
          <div className="mypageInfoAlter-input-box">
            <input
              onChange={(e) => handleChange("newCheck", e.target.value)}
              type={isPasswordConfirmVisible ? "text" : "password"}
              className="mypageInfoAlter-input"
              maxLength={15}
              value={newPwCheck}
              disabled={!newPw}
            />
            {!isPasswordConfirmVisible ? (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEyeInvisible onClick={togglePasswordCheckVisibility} />
              </div>
            ) : (
              <div className="mypageInfoAlter-popup-toggle-visibility">
                <AiFillEye onClick={togglePasswordCheckVisibility} />
              </div>
            )}
          </div>
        </div>

        {newPwCheckMessage && (
          <p
            className={`mypageInfoAlter-popup-member-pwCheck ${
              newPwCheckVaild ? "success" : "error"
            }`}
          >
            {newPwCheckMessage}
          </p>
        )} */}

        <div className="mypageInfoAlter-button">
          <button type="button" onClick={handleClose}>
            취소
          </button>
          <button type="button" onClick={handleConfirm}>
            확인
          </button>
          {/* <button type="button" onClick={() => handleConfirm(targetField)}>
            확인
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MyPageInfoAlterPopup;
