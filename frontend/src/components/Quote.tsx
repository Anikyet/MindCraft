import heroIllustration from "../assets/isometric_24.png";


export const Quote = () =>{
    return <div className=" rounded-3xl bg-slate-50 h-screen flex justify-center items-center flex-col">
                  <div className=" transform hover:scale-105 transition-transform duration-500">
            <img
              src={heroIllustration}
              alt="MindCraft blogging platform illustration"
              className="w-full h-auto max-w-lg  drop-shadow-2xl"
            />
          </div>
        <p className="text-2xl font-semibold text-slate-700">Mindcraft is where ideas take shape</p>
        <p className="px-6 text-sm">A space to craft thoughts, share stories, and inspire minds through words.</p>
        <p className="px-6 text-sm  text-slate-400 "> Developer | Anikyet </p>
    </div>
}