import { useBlogs } from "../hooks";
import { CompleteBlog } from "../components/CompleteBlog";
import { Skeleton } from "../components/Skeleton";

export const PublishedBlogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        <Skeleton />
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        No published blogs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-10 py-10">
      {blogs.map((blog) => (
        <div key={blog.id} className="border rounded-xl shadow-md p-5">
          <CompleteBlog blog={blog} />
        </div>
      ))}
    </div>
  );
};
