import { useRecoilValueLoadable } from "recoil";
import { CompleteBlog } from "../components/CompleteBlog";
import { Skeleton } from "../components/Skeleton";
import { useParams } from "react-router-dom";
import { blogAtomFamily } from "../AtomStore/BlogAtoms";
import { BackBtn } from "../components/BackBtn";



export const Blog = () => {
  
  const { id } = useParams();
  console.log("id on blog.tsx" + id);
  const blogLoadable = useRecoilValueLoadable(blogAtomFamily(id ||""));

  if (blogLoadable.state === "loading"){
    return (
      <div className="flex justify-center">
        <Skeleton />
      </div>
    );
  }
  console.log(blogLoadable);
  return (<>
    <BackBtn/>
    <div className="flex flex-col justify-center items-center w-full">
      <div>
        <CompleteBlog blog={blogLoadable.contents!} />
      </div>
    </div>
    </>
  );
};
