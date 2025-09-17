import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

type Blogs = {
  id: string;
  title: string;
  content: string;
  published?: boolean,
  createdAt?: Date,
  author: {
    name: string;
  };
};

export type Blog = {
  id: string,
  title: string,
  content: string,
  published?: boolean,
  createdAt?: any,
  author: {
    name: string
  }
}

export type PublishedBlogs = {
  id: string,
  title: string,
  content: string,
  published?: boolean,
  createdAt?: any,
  author: {
    name: string
  }
}

export const usePageinationedFetch = <T,>(
  endpoint: string,
  page: number,
  limit: number,
) => {
  const [blogs, setBlogs] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {

      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        const res = await axios.get(`${BACKEND_URL}/${endpoint}`, {
          params: { page, limit },
          headers: {
            Authorization: `${token}`, 
            "Content-Type": "application/json",
          }
        });
        setBlogs(res.data.blogs || []);
        setTotalPages(res.data.totalPages);
      } catch (e) {
         console.error("Pagination fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [endpoint, page, limit]);
  return { blogs, totalPages, loading}
};

export const useBlog = ({ id }: { id: string }) => {
  console.log("id on hooks" + id)
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/api/v1/post/${id}`, {
      headers: {
        Authorization: `${token}`, // dynamically set token
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      setBlog(response.data);
      setLoading(false);
    })
  }, [id]);

  return {
    loading,
    blog
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/api/v1/post/bulk`, {
      headers: {
        Authorization: `${token}`, // dynamically set token
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setBlogs(response.data.blogs);
      setLoading(false);
    })
  }, []);

  return {
    loading,
    blogs
  }
}

export const usePublishedBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [publishedBlogs, setPublishedBlogs] = useState<PublishedBlogs[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/api/v1/post/blog/userPosts`, {
      headers: {
        Authorization: `${token}`, // dynamically set token
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setPublishedBlogs(response.data.blogs);
      setLoading(false);
    })
  }, []);

  return {
    loading,
    publishedBlogs
  }
}

export const useDraftBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [draftBlogs, setDraftBlogs] = useState<PublishedBlogs[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/api/v1/post/blog/drafts`, {
      headers: {
        Authorization: `${token}`, // dynamically set token
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setDraftBlogs(response.data.blogs);
      setLoading(false);
    })
  }, []);

  return {
    loading,
    draftBlogs
  }
}

export const useFavBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [favBlogs, setFavBlogs] = useState<PublishedBlogs[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_URL}/api/v1/post/blog/fav`, {
      headers: {
        Authorization: `${token}`, // dynamically set token
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setFavBlogs(response.data.blogs);
      setLoading(false);
    })
  }, []);

  return {
    loading,
    favBlogs
  }
}


