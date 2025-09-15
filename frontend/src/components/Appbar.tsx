import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useRecoilState } from "recoil";
import { authAtom } from "../AtomStore/LoginAuth";
import { LogOut } from "./LogOut";

export const Appbar = () => {
  const [auth] = useRecoilState(authAtom);
console.log(auth.isLoggedIn)
  return (
    <div className="border-b flex justify-between px-12 py-3 bg-slate-100">
      <div className="flex font-semibold cursor-pointer">
        <div className="w-10 h-7 rounded-md bg-black text-white pl-2 pr-4 mx-1">
          <p>MC</p>
        </div>
        <div>
          <Link to={"/"}>MindCrafts</Link>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <Link to={auth.isLoggedIn ? `/publish` : `/signin`}>
          <button className="bg-black hover:bg-brand-slate-dark text-white px-6 py-2 text-sm font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Start Writing
          </button>
        </Link>

        
        {auth.isLoggedIn ? (
          <LogOut />
        ) : (
          <Avatar name="" size={5} />
        )}
      </div>
    </div>
  );
};
