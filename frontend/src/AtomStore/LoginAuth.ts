
import { atom } from "recoil";

export const authAtom = atom({
  key: "authAtom", 
  default: {
    isLoggedIn: !!localStorage.getItem("token"), 
    token: localStorage.getItem("token") || null,
  },
});
