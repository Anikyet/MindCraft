
export const Skeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="grid grid-cols-12 px-10 p-10 mx-40 gap-10">
        {/* Main blog content */}
        <div className="col-span-9 space-y-4">
          {/* Title skeleton */}
          <div className="bg-slate-300 h-10 w-3/4 rounded-md"></div>

          {/* Date skeleton */}
          <div className="bg-slate-300 h-4 w-1/4 rounded-md"></div>

          {/* Content skeleton (multiple lines) */}
          <div className="space-y-2 mt-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`bg-slate-300 h-4 rounded-md ${i % 3 === 0 ? "w-5/6" : "w-full"}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Author section */}
        <div className="col-span-3 space-y-4">
          {/* Author heading */}
          <div className="bg-slate-300 h-6 w-1/2 rounded-md"></div>

          {/* Author info */}
          <div className="flex gap-5 items-start">
            {/* Avatar */}
            <div className="bg-slate-300 rounded-full w-14 h-14"></div>

            {/* Author name and bio */}
            <div className="flex flex-col gap-2">
              <div className="bg-slate-300 h-5 w-32 rounded-md"></div>
              <div className="bg-slate-300 h-4 w-40 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
