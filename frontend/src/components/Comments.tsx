import axios from "axios";
import { BACKEND_URL } from "../config";

// type CommentProps = {
//   content: string;
//   id?: string;
//   author: string;
//   createdAt: string;
// };
// export const Comments = ({ content, author, createdAt, id }: CommentProps) => {
//   async function handleDelete() {
//     if (!id) return;

//     const confirmDelete = confirm(
//       "Are you sure you want to delete this comment?"
//     );
//     if (!confirmDelete) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`${BACKEND_URL}/api/v1/post/blog/comments/${id}`, {
//         headers: {
//           Authorization: `${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       alert("Comment deleted successfully!");
//     } catch (err) {
//       console.error("Failed to delete comment:", err);
//       alert("Failed to delete comment");
//     }
//   }
//   const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
//   return (
//     <div className="flex relative flex-col justify-between mt-4 border-b border-slate-300">
//       <button
//         onClick={handleDelete}
//         className="p-2  text-xl absolute right-2 rounded-full hover:bg-slate-300 bg-slate-200"
//       >
//         <span>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 24 24"
//             fill="currentColor"
//             className="size-6"
//           >
//             <path
//               fillRule="evenodd"
//               d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </span>
//       </button>
//       <div className="flex  items-center">
//         <p className="inline-flex items-center mr-3 text-sm  text-slate-700 font-semibold">
//           {author}
//         </p>
//         <p className="text-sm text-gray-600 dark:text-gray-400">
//           {formattedDate}
//         </p>
//       </div>

//       <div className="p-2">
//         <p className="text-gray-500 dark:text-gray-400 ">{content}</p>
//       </div>
//     </div>
//   );
// };


type CommentProps = {
  id?: string;
  content: string;
  author: string;
  createdAt: string;
  authorId: string;
  currentUserId: string;
  onDelete?: (id: string) => void;
};

export const Comments = ({
  id,
  content,
  author,
  createdAt,
  authorId,
  currentUserId,
  onDelete,
}: CommentProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function handleDelete() {
    if (!id) return;

    const confirmDelete = confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/api/v1/post/blog/comments/${id}`, {
        headers: { Authorization: `${token}` },
      });
      alert("Comment deleted successfully!");
      if (onDelete) onDelete(id); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment");
    }
  }
console.log(authorId+"autherid cooment"+"current auther id"+ currentUserId)
  return (
    
    <div className="flex relative flex-col justify-between mt-4 border-b border-slate-300">
      {authorId === currentUserId && (
        <button
          onClick={handleDelete}
          className="p-2 text-xl absolute right-2 rounded-full hover:bg-slate-300 bg-slate-200"
        >
                 <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        </button>
      )}

      <div className="flex items-center">
        <p className="inline-flex items-center mr-3 text-sm text-slate-700 font-semibold">{author}</p>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>
      <div className="p-2">
        <p className="text-gray-500">{content}</p>
        
      </div>
    </div>
  );
};
