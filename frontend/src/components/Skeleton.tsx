
export const Skeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="grid grid-cols-12 px-10 p-10 mx-40 gap-10">

        <div className="col-span-9 space-y-4">
          <div className="bg-slate-300 h-10 w-3/4 rounded-md"></div>

          <div className="bg-slate-300 h-4 w-1/4 rounded-md"></div>

          <div className="space-y-2 mt-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`bg-slate-300 h-4 rounded-md ${i % 3 === 0 ? "w-5/6" : "w-full"}`}
              ></div>
            ))}
          </div>
        </div>

        <div className="col-span-3 space-y-4">
          <div className="bg-slate-300 h-6 w-1/2 rounded-md"></div>

          <div className="flex gap-5 items-start">
            <div className="bg-slate-300 rounded-full w-14 h-14"></div>

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
