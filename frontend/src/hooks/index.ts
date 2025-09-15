import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

type Blogs = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
};

 export type Blog ={
    id:string,
    title:string,
    content:string,
    published:boolean,
    author:{
        name:string
    }
}

export const useBlog = ({id}: {id:string}) =>{
    console.log("id on hooks"+id)
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() =>{
      const token = localStorage.getItem("token");
       axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `${token}`, // dynamically set token
          "Content-Type": "application/json",
        },
      }).then( (response) =>{
        console.log(response);
        setBlog(response.data);
        setLoading(false);
      })
    },[id]);

    return {
        loading,
        blog
    }
}

export const useBlogs =() =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    useEffect(() =>{
      const token = localStorage.getItem("token");
       axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `${token}`, // dynamically set token
          "Content-Type": "application/json",
        },
      }).then( (response) =>{
        setBlogs(response.data.blogs);
        setLoading(false);
      })
    },[]);

    return {
        loading,
        blogs
    }
}
