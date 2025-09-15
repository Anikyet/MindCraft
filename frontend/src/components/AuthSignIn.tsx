import type { SigninInput } from "@anikyet/mindcraft_common";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const AuthSignIn = () => {
    const [postInput, setPostInputs] = useState<SigninInput>({
      email: "",
      password: "",
    });
const navigate = useNavigate();


  async function sendRequest(){
    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInput)
        const jwt ="Bearer "+response.data.token;
        localStorage.setItem("token",jwt);
        navigate("/blogs");
    } catch(e){
        console.log(e);
    }
  }

  return (
    <div className="bg-slate-100 h-screen flex justify-center items-center flex-col ">
      {JSON.stringify(postInput)}
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
            placeholder="Pleas create a password"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />
          <button onClick={sendRequest}
            type="button"
            className="text-white w-52  bg-[#050708] hover:bg-[#050708]/90 focus:ring-2 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mt-4"
          >
            Signin
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
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-950 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
