import { atom } from "recoil";

export const useridState = atom({
  key: "userId",
  default: "",
});

export const userpwdState = atom({
  key: "userPwd",
  default: "",
});

export const projectidState = atom({
  key: "projectId",
  default: "",
});

export const projectNameState = atom({
  key: "projectName",
  default: "",
});
