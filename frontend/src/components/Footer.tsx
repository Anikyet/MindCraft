import { Link } from "react-router-dom";
import { Instagram, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <div className=" bg-slate-100 mx-auto p-4">
      {/* Main Footer Content */}
      <div className="flex justify-center  flex-col lg:flex-row items-start">
        {/* Brand Section */}
        <div className="lg:max-w-md">
          <div>
            <h3 className="text-3xl text-center font-bold ">MindCraft</h3>
            <p className="text-brand-slate text-base leading-relaxed mt-4">
              Craft your thoughts into beautiful stories. The completely free
              blogging platform for creative minds and thoughtful writers.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="group pt-3 bg-muted/50 rounded-full text-brand-slate hover:text-foreground hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              className="group pt-3 bg-muted/50 rounded-full text-brand-slate hover:text-foreground hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 border-t border-border mt-12 pt-8  md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-1 text-sm text-brand-slate">
          <span>Made with</span>
          <Heart size={16} className="text-red-500 fill-current" />
          <span>by the MindCraft Developer : Aniket</span>
        </div>
        <div className="flex justify-center">
          <a
            href="mailto:anikait051@gmail.com"
            className="flex items-center text-brand-slate hover:text-primary transition-color"
          >
            <Mail
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
             Support
          </a>
        </div>
        <div className="flex justify-end text-sm text-brand-slate">
          <Link to="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <span>&copy; 2025 MindCraft. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
