import {usePublishedBlogs } from "../hooks";
import { CompleteBlog } from "../components/CompleteBlog";
import { Skeleton } from "../components/Skeleton";
import { BackBtn } from "../components/BackBtn";

export const Published = () => {
  const { loading, publishedBlogs } = usePublishedBlogs();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        <Skeleton/>
      </div>
    );
  }

  if (!publishedBlogs || publishedBlogs.length === 0) {
    return (
      <>
      <BackBtn />
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        No published blogs found.
      </div>
      </>
    );
  }

  return (
    <>
    <BackBtn />
    <div className="flex flex-col gap-10 px-10 py-10">
      <p className=" italic font-bold text-md text-slate-600">All your Published Blogs</p>
      {publishedBlogs.map((blog) => (
        <div key={blog.id} className="border rounded-xl shadow-md p-5">
          <CompleteBlog blog={blog} />
        </div>
      ))}
    </div>
    </>
  );
};
