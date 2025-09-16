

import {useDraftBlogs } from "../hooks";
// import { CompleteBlog } from "../components/CompleteBlog";
import { DraftBlog } from "../components/DraftBlog";

export const Drafts = () => {
  const { loading, draftBlogs } = useDraftBlogs();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        Loading blogs...
      </div>
    );
  }

  if (!draftBlogs || draftBlogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        No Draft blogs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-10 py-10">
       <p className=" italic font-bold text-md  text-slate-600"> Hey here are your blogs in draft waiting to be read by people. </p>
      {draftBlogs.map((blog) => (
        <div key={blog.id} className="border rounded-xl shadow-md p-5">
          <DraftBlog blog={blog} />
        </div>
      ))}
    </div>
  );
};
