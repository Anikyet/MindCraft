
import { useState, useEffect } from "react";
import { Comments } from "./Comments";
import { BACKEND_URL } from "../config";
import axios from "axios";

export type CommentType = {
  id?: string;
  content: string;
  author: string;
  createdAt: string;
  authorId: string;
};

export const ListComment = ({ id }: { id: string }) => {
 const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem("userId") || ""; 

  useEffect(() => {
    async function fetchComments() {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);

        const res = await axios.get(
          `${BACKEND_URL}/api/v1/post/blog/comments/${id}`,
          {
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setComments(res.data.comments);
      } catch (err) {
        console.error("Error fetching comments", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchComments();
  }, [id]);

  const handleCommentDelete = (deletedId: string) => {
    setComments(prev => prev.filter(c => c.id !== deletedId));
  };

  return (
    <div className="flex flex-col mb-2 mt-10 bg-slate-200 rounded-md px-2">
      <p className="pt-2 font-semibold">Comments</p>

      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <Comments
            key={comment.id}
            id={comment.id}
            authorId={comment.authorId}
            content={comment.content}
            author={comment.author}
            createdAt={comment.createdAt}
            currentUserId={currentUserId}
            onDelete={handleCommentDelete} 
          />
        ))
      ) : (
        <p className="text-gray-500 italic">No comments yet.</p>
      )}
    </div>
  );
};
