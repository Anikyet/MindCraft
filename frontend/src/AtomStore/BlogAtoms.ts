import {  atomFamily, selectorFamily } from "recoil";
import { BACKEND_URL } from "../config";
import axios from "axios";
import type { Blog } from "../hooks";

export const blogAtomFamily = atomFamily<Blog | null, string>({
  key: "blogAtom",
  default: selectorFamily({
    key : "blogSelectorFamily",
    get: (id: string) => async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data ;
    },
  })
})

