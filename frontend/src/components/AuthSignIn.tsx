import type { SigninInput } from "@anikyet/mindcraft_common";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { authAtom } from "../AtomStore/LoginAuth";

export const AuthSignIn = () => {
  const [postInput, setPostInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authAtom);
  const [loading, setLoading] = useState(false);
  async function sendRequest() {
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        postInput
      );
      const jwt = "Bearer " + response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("username", response.data.username);
      setAuth({
        isLoggedIn: true,
        token: jwt,
      });
      navigate("/post");
    } catch (e: any) {
  console.error(e);
  alert(e.response?.data?.error || "Signin failed, try again.");
} finally {
      setLoading(false);
    }
  }

  return (
    <div className=" h-screen flex justify-center items-center flex-col ">
      <div className="w-full flex flex-col ">
        <div className="">
          <div className=" text-3xl  font-bold text-center">
            Hey Welcom Back!
          </div>
          <div className=" text-slate-400 text-center">
            Don't have an account?
            <Link
              className="pl-2 text-slate-600  font-semibold underline"
              to={"/signup"}
            >
              Signup
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center mt-2">
          <LablelledInput
            type="email"
            label="Email"
            placeholder="johndoe@gmail.com"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />
          <LablelledInput
            type="password"
            label="Password"
            placeholder="Pleas enter password"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />
          <button
            onClick={sendRequest}
            type="button"
            disabled={loading}
            className="text-white w-52  bg-[#050708] hover:bg-[#050708]/90 focus:ring-2 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mt-4"
          >
            {loading ? "Signin in...." : "Signin"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LablledInputType {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function LablelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LablledInputType) {
  return (
    <div className="w-1/2 mt-2">
      <label className="block ml-1 mb-1 text-sm  font-bold text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-950 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
