import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authAtom } from "../AtomStore/LoginAuth";
import { AppbarMenu } from "./AppbarMenu";

export const Appbar = () => {
  const [auth] = useRecoilState(authAtom);
console.log(auth.isLoggedIn)
  return (
    <div className="border-b flex justify-between lg:px-12 py-3 bg-slate-100">
      <div className="flex font-semibold cursor-pointer">
        <div className="w-10 h-7 rounded-md bg-black text-white pl-2 pr-4 mx-1">
          <p>MC</p>
        </div>
        <div className="">
          <Link to={"/"}>MindCrafts</Link>
        </div>
      </div>

      <div className="flex gap-x-2 lg:gap-x-4 items-center">
        <Link to={auth.isLoggedIn ? `/publish` : `/signin`}>
          <button className="bg-black hover:bg-brand-slate-dark text-white px-2 py-2 lg:px-6 lg:py-2 text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Start Writing
          </button>
        </Link>

        
        {auth.isLoggedIn ? (
          <AppbarMenu />
        ) : ""}
      </div>
    </div>
  );
};
