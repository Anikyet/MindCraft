import { Link } from "react-router-dom";

interface BlogCArdProps {
  id:string,
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCArdProps) => {
  return (
    <Link to={`/blog/${id}`} >
    <div className=" p-4 border-b border-slate-200  pb-4 cursor-pointer">
      <div className="flex gap-2 mb-1">
        <div className="flex justify-center flex-col">
          <Avatar name={authorName} size={50}/>
        </div>
        <div className="font-light text-sm">{authorName} </div>
        <div className=" flex justify-center flex-col mt-2">
          {" "}
          <Circle />{" "}
        </div>
        <div className="font-extralight text-slate-500 text-sm">{publishedDate}</div>
      </div>
      <div className="text-xl font-bold text-slate-900">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 500) + "..."}</div>
      <div className="text-slate-400 text-sm pt-4">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
    </div>
    </Link>
  );
};

export function Avatar({ name,size=100 }: { name: string, size?:number }) {
  return (
    <div className={`relative inline-flex items-center justify-center w-[${size}px] h-[${size}px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400`}
    
    >
      <span className="font-medium text-xs text-gray-900 dark:text-gray-900">
        {name[0]}
      </span>
    </div>

  );
}

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}
