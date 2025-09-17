
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { usePageinationedFetch } from "../hooks";
// import  blogright  from "../assets/blogright.png"
// import blogleft from "../assets/blogleft.png"
import image from "../assets/image.png"
import { useState } from "react";
import { PaginationBtn } from "../components/PaginationBtn";

export const Blogs = () => {

  const [page,setPage] = useState(1);
  const {blogs, totalPages, loading} = usePageinationedFetch<any>(
    'api/v1/post/bulk',
    page,
    2
  );

  if(loading){
    return         <div className=" flex flex-col gap-y-10">
                    <div> <BlogSkeleton /></div>
                     <div> <BlogSkeleton /></div>
                     <div> <BlogSkeleton /></div>
              </div>
  }
  return (
    <>
    <div className="grid grid-cols-6 relative">
    <div className="flex justify-center relative col-span-5 ">
      {/* <div className="absolute left-12 top-20 w-96 ">
        <img className="" src={image} />
      </div> */}
    <div className=" ml max-w-3xl ">

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
              <div className="hidden lg:block absolute right-0 top-10  ">
        {/* <img src={blogright} /> */}
                <img className="w-96" src={image} />
      </div>
    </div>
    <PaginationBtn
      page={page}
      totalPages={totalPages}
      onPrev={() => setPage(prev => Math.max(prev - 1, 1))}
      onNext={() => setPage(prev => Math.min(prev + 1, totalPages))}
      disabled={loading}
    />
</>
  );
};
