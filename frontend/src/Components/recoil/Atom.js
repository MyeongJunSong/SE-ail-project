import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const useridState = atom({
  key: "userId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userpwdState = atom({
  key: "userPwd",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const projectidState = atom({
  key: "projectId",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const projectNameState = atom({
  key: "projectName",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
