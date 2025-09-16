
import { Avatar } from "./BlogCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { authAtom } from "../AtomStore/LoginAuth";
import { useRecoilValue } from "recoil";
import { Comment } from "./Comment";
import { ListComment } from "./ListComments";
import { Link } from "react-router-dom";
import { DeleteBlogBtn } from "./DeleteBlogBtn";
import { MarkFavBtn } from "./MarkFavBtn";

export const FavBlogList = ({ blog }: { blog: any }) => {
  const auth = useRecoilValue(authAtom);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 px-10 p-10 mx-40 gap-10">
        <div className="col-span-9">
          <div className=" flex ">
            <div className=" left-0 ">
              {localStorage.getItem("username") === blog.post.name ? (
                <DeleteBlogBtn blogId={blog.post.id}></DeleteBlogBtn>
              ) : (
                ""
              )}
            </div>
            <div className=" right-0 ">
              <MarkFavBtn blogId={blog.post.id} />
            </div>
          </div>
          {/* Blog Title */}
          <div className="text-3xl font-extrabold">{blog.post.title}</div>
          <div className="text-slate-500 pt-2">Posted on 14 March 2025</div>

          {/* Blog Content */}
          <div className="prose prose-lg mt-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-3xl font-bold my-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-2xl font-bold my-2" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-xl font-bold my-1" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="my-2 text-slate-800" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc ml-6 my-2" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal ml-6 my-2" {...props} />
                ),
                code: ({ node, className, children, ...props }) => (
                  <code
                    className={`bg-gray-100 px-1 py-0.5 rounded text-sm ${
                      className || ""
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-slate-300 pl-4 italic my-2"
                    {...props}
                  />
                ),
                hr: ({ node, ...props }) => (
                  <hr className="my-4 border-slate-300" {...props} />
                ),
              }}
            >
              {blog.post.content}
            </ReactMarkdown>
          </div>
          {!auth.isLoggedIn ? (
            <div className="bg-black px-2 py-2 my-10 text-white font-bold w-60 rounded-lg">
              {" "}
              <Link to={"/signin"}>
                <button>Want to say something..? Let's Login first.</button>
              </Link>{" "}
            </div>
          ) : (
            " "
          )}
          <div className="">
            {" "}
            {auth.isLoggedIn ? <Comment id={blog.post.id || " "} /> : ""}
          </div>
          <div className="">
            {" "}
            {auth.isLoggedIn ? <ListComment id={blog.post.id || " "} /> : ""}
          </div>
        </div>

        {/* Author Section */}
        <div className="col-span-3">
          <div className="text-xl font-bold mb-4">Author</div>
          <div className="flex gap-5 items-start">
            <div>
              <Avatar name={blog.post.author.name} size={7} />
            </div>
            <div>
              <div className="text-2xl font-bold">{blog.post.author.name}</div>
              <div className="pt-2 text-slate-500">
                Random catchy phrase about the author's bio
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
