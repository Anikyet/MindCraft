// import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroIllustration from "../assets/hero-illustration.png";
import imgage from "../assets/hero.png"
import { Link, useNavigate } from "react-router-dom";
export const Landing = () => {
  const nevigate = useNavigate();
  return (
    <>
      <div className="max-w-screen-2xl  py-28 bg-slate-50 ">
        <div className="  lg:flex relative justify-center gap-4">
          <div className="grid grid-cols-2  lg:flex justify-end lg:flex-col ">
            <div className=" hidden md:block absolute -top-24 left-28  w-full h-full">
                <img className=" hidden  xl:block h-60 transform hover:scale-105 transition-transform duration-500" src={imgage}/>
            </div>
            <div className="space-y-6 flex flex-col justify-end w-full">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Craft Your Mind Into Words
              </h1>
              <p className="text-xl text-slate-700 text-brand-slate leading-relaxed max-w-lg">
                The completely free blogging platform that transforms your
                thoughts into beautiful, engaging stories. Write, publish, and
                connect with readers worldwide - no limits, no fees.
              </p>
            </div>
            <div className=" py-0 lg:flex  sm:flex-row gap-4">
              <button onClick={()=> nevigate('/signup')} className=" flex justify-center items-center bg-black hover:bg-brand-slate-dark text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Start Writing - It's Free!
                <ArrowRight className="ml-2" size={20} />
              </button>
              <div></div>
            </div>
          </div>
          <div className=" transform hover:scale-105 transition-transform duration-500">
            <img
              src={heroIllustration}
              alt="MindCraft blogging platform illustration"
              className="w-full h-auto max-w-lg  drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full items-center py-16">
        <h1 className="text-slate-800 text-xl lg:text-4xl font-bold text-foreground leading-tight">
          Ready to Start Your Writing Journey?
        </h1>
        <p className=" text-slate-500 text-md py-5 text-brand-slate text-center leading-relaxed max-w-lg">
          Join thousands of writers who've already discovered the joy of
          creating with MindCraft. Start your free account today and publish
          your first story - completely free, forever.
        </p>
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <span>✓ Completely free forever</span>
          <span>•</span>
          <span>✓ No hidden fees</span>
          <span>•</span>
          <span>✓ Unlimited posts</span>
        </div>
        <div className="flex  sm:flex-row gap-4">
          <Link to={'/post'} >
          <button className=" flex justify-center items-center bg-black hover:bg-brand-slate-dark text-white px-4 py-2 mt-4 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Start Reading....
            <ArrowRight className="ml-2" size={20} />
          </button>
          </Link>
          <div></div>
        </div>
      </div>
    </>
  );
};
