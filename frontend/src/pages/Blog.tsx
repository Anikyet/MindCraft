import { CompleteBlog } from "../components/CompleteBlog";
import { Skeleton } from "../components/Skeleton";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"


export const Blog = () =>{
    const {id} = useParams();
    console.log("id on blog.tsx" + id)
    const {loading,blog} = useBlog({
        id: id || ""
    });
    if(loading){
        return (
            <div className="flex justify-center">
              <Skeleton />
            </div>
        )
    }
    console.log(blog);
    return <div className="flex justify-center w-full">
       <CompleteBlog blog={blog!} />
    </div>
}