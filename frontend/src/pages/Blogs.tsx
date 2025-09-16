
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
// import  blogright  from "../assets/blogright.png"
// import blogleft from "../assets/blogleft.png"
import image from "../assets/image.png"

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
    <div className="grid grid-cols-6 relative">
    <div className="flex justify-center relative col-span-5 ">
      {/* <div className="absolute left-12 top-20 w-96 ">
        <img className="" src={image} />
      </div> */}
    <div className="  max-w-3xl ">

      {blogs.map(blog =>(
              <BlogCard
              key={blog.id}
        id={blog.id}
        authorName={blog.author.name}
        title={blog.title}
        content={blog.content}
        createdAt={blog.createdAt } 
      />
      ) )}

    </div>

    </div>
              <div className="absolute right-0 top-10  ">
        {/* <img src={blogright} /> */}
                <img className="w-96" src={image} />
      </div>
    </div>
  );
};
