
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { blogs, loading} = useBlogs();

  if(loading){
    return         <div className=" flex flex-col gap-y-10">
                    <div> <BlogSkeleton /></div>
                     <div> <BlogSkeleton /></div>
                     <div> <BlogSkeleton /></div>
              </div>
  }
  return (
    <div className="flex justify-center">
    <div className="  max-w-2xl ">

      {blogs.map(blog =>(
              <BlogCard
              key={blog.id}
        id={blog.id}
        authorName={blog.author.name}
        title={blog.title}
        content={blog.content}
        publishedDate="14th March 1999"
      />
      ) )}

    </div>
    </div>
  );
};
