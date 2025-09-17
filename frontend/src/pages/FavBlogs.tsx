

import {useFavBlogs} from "../hooks";
import { FavBlogList } from "../components/FavBlogList";
import { Skeleton } from "../components/Skeleton";
import { BackBtn } from "../components/BackBtn";

export const FavBlogs = () => {
  const { loading, favBlogs } = useFavBlogs();

  if (loading) {
    return (
      <>
      <BackBtn />
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        <Skeleton />
      </div>
      </>
    );
  }

  if (!favBlogs || favBlogs.length === 0) {
    return (
      <>
      <BackBtn />
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        No Favourite blogs yet.
      </div>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-10 py-10">
        <p className=" italic font-bold text-md  text-slate-600"> Hey here are your Favourite Blogs </p>
      {favBlogs.map((blog) => (
        <div key={blog.id} className="border rounded-xl shadow-md p-5">
          <FavBlogList blog={blog} />
        </div>
      ))}
    </div>
  );
};
