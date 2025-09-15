import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-12 py-3">
      <div className="font-semibold cursor-pointer">
        <Link to={"/blogs"}>MindCrafts</Link>
      </div>
      <div className="flex gap-4">
        <Link to={`/publish`}>
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-2 py-1 text-center  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Create Blog
        </button>
        </Link>
        <div>
        <Avatar name="Anikyet" size={5} />
        </div>
      </div>
    </div>
  );
};
