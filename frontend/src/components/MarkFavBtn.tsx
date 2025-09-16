import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";



export const MarkFavBtn = ({ blogId }: { blogId: string }) => {
  const [loading, setLoading] = useState(false);
  const [isFav, setIsFav] = useState(false);
    const nevigate = useNavigate();
  useEffect(() => {
    const fetchFavStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/post/blog/isFav/${blogId}`,
          { headers: { Authorization: `${token}` } }
        );
        setIsFav(response.data.isFav); // backend returns { isFav: true/false }
      } catch (err) {
        console.error("Failed to fetch favorite status", err);
      }
    };

    fetchFavStatus();
  }, [blogId,isFav]);
  const handleMarkFav = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/v1/post/blog/markFav`,
        { id: blogId },
        {
          headers: { Authorization: `${token}` },
        }
      );
        setIsFav((prev) => !prev);
        nevigate('/fav')
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleMarkFav}
        disabled={loading}
        className={` p-2 m-8 text-xl ${isFav ? "text-black" : "text-white"} rounded-full hover:bg-slate-300 bg-slate-200 `}
      >
        <svg
        fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  );
};
