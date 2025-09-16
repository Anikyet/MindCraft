import type { Blog } from "../hooks";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; 
import rehypeRaw from "rehype-raw";   
import axios from "axios";
import { BACKEND_URL } from "../config";
import { DeleteBlogBtn } from "./DeleteBlogBtn";
import { useNavigate } from "react-router-dom";

export const DraftBlog = ({ blog }: { blog: Blog }) => {
  const nevigate = useNavigate();
async function handlePublish() {
  console.log("Publishing blog:", blog.id);

  const token = localStorage.getItem("token");

  await axios.put(
    `${BACKEND_URL}/api/v1/post/blog/publish`,
    { id: blog.id }, // body
    {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }
  )
  .then((res) => {
    console.log("Blog published successfully:", res.data);
    alert("Blog published successfully!");
    nevigate('/dashboard')
  })
  .catch((err) => {
    console.error("Error publishing blog:", err);
    alert("Failed to publish the blog. Please try again.");
  });
}
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 px-10 p-10 mx-40 gap-10">
        <div className="col-span-12">
          {/* Blog Title */}       
          <div className="text-slate-500 pt-2 flex justify-between">
            <div>Draft Preview</div>
            {localStorage.getItem("username") === blog.author.name ? <div><DeleteBlogBtn blogId={blog.id}></DeleteBlogBtn></div> :""}
            </div>
          <div className="text-3xl font-extrabold">{blog.title}</div>

          {/* Blog Content */}
          <div className="prose prose-lg mt-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-2" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold my-1" {...props} />,
                p: ({ node, ...props }) => <p className="my-2 text-slate-800" {...props} />,
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                ),
                ul: ({ node, ...props }) => <ul className="list-disc ml-6 my-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal ml-6 my-2" {...props} />,
                code: ({ node, className, children, ...props }) => (
                  <code
                    className={`bg-gray-100 px-1 py-0.5 rounded text-sm ${className || ""}`}
                    {...props}
                  >
                    {children}
                  </code>
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-slate-300 pl-4 italic my-2" {...props} />
                ),
                hr: ({ node, ...props }) => <hr className="my-4 border-slate-300" {...props} />,
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Publish Button */}
          <div className="mt-10">
            <button
              onClick={handlePublish}
              className="bg-black hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-lg shadow-md"
            >
              Publish Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
