import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef, useState } from "react";

export const Comment = ({ id }: { id: String }) => {
  const commentData = useRef<HTMLInputElement | any>(null);
  const [loading, setLoading] = useState(false);
  async function submitComment() {
    setLoading(true);
    try {
      const dataObj = {
        id: id,
        comment: commentData.current?.value || "",
      };
      const token = localStorage.getItem("token");
      await axios.post(`${BACKEND_URL}/api/v1/post/blog/comment`, dataObj, {
        headers: { Authorization: `${token}` },
      });

      alert("comment created successfully!");
      if (commentData.current) commentData.current.value = "";
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <div className="py-2 px-4  mt-10 bg-slate- mb-4 bg-slate-200 rounded-lg rounded-t-lg border border-gray-200 ">
          <label className="sr-only">Your comment</label>
          <textarea
            ref={commentData}
            id="comment"
            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none bg-slate-200"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          onClick={submitComment}
          className="inline-flex items-center py-2.5 px-8 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 bg-black hover:bg-slate-800"
        >
          {loading ? "Posting...." : "Post"}
        </button>
      </div>
    </>
  );
};
