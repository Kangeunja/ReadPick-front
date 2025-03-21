import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // 저장 키
  storage: sessionStorage, // sessionStorage 사용
});

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    userIdx: null,
    nickName: "",
    userName: "",
    email: "",
    adminAt: "",
    firstAt: "",
    id: "",
  },
  effects_UNSTABLE: [persistAtom], // sessionStorage에 자동 저장
});
