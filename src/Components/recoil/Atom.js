import { atom } from "recoil";

export const useridState = atom({
  key: "userId",
  default: "",
});

export const userpwdState = atom({
  key: "userPwd",
  default: "",
});
