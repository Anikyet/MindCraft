
export const BlogSkeleton = () => {
  return (
    <div className="grid grid-cols-3">
        <div className="col-span-1"> </div>
    <div className=" col-span-1 p-4 border-b border-slate-200 pb-4 cursor-pointer animate-pulse">
      {/* Author section */}
      <div className="flex gap-2 mb-1">
        <div className="flex justify-center flex-col">
          <div className="bg-slate-300 rounded-full w-12 h-12"></div>
        </div>
        <div className="bg-slate-300 h-4 w-24 rounded-md font-light text-sm"></div>
        <div className="flex justify-center flex-col mt-2">
          <div className="bg-slate-300 w-3 h-3 rounded-full"></div>
        </div>
        <div className="bg-slate-300 h-3 w-20 rounded-md font-extralight text-slate-500 text-sm"></div>
      </div>

      {/* Title */}
      <div className="bg-slate-300 h-6 w-3/4 rounded-md mb-2"></div>

      {/* Content snippet */}
      <div className="bg-slate-300 h-4 w-full mb-1 rounded-md"></div>
      <div className="bg-slate-300 h-4 w-5/6 mb-1 rounded-md"></div>
      <div className="bg-slate-300 h-4 w-4/6 mb-1 rounded-md"></div>

      {/* Read time */}
      <div className="bg-slate-300 h-3 w-20 rounded-md mt-4"></div>
    </div>
    <div className="col-span-1"> </div>
    </div>
  );
};
