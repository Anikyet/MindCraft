import { useSetRecoilState } from "recoil";
import { authAtom } from "../AtomStore/LoginAuth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const AppbarMenu = () => {
  const setAuth = useSetRecoilState(authAtom);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth({ isLoggedIn: false, token: null });
    navigate("/signin");
  };

  return (
    <div  className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onMouseEnter={() => setIsOpen(isOpen=> isOpen=true)}
        className="text-white bg-black hover:bg-slate-800 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center "
      >
        {localStorage.getItem("username")}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
        
        onMouseLeave={() => setIsOpen(isOpen=> isOpen=false)}
        className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
                <Link to={'/dashboard'} >
              <p
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </p>
              </Link>
            </li>
                        <li>
                <Link to={'/published'} >
              <p
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Published
              </p>
              </Link>
            </li>
            <Link to={'/drafts'} >
            <li>
              <p
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Drafts
              </p>
            </li>
            </Link>
            <Link to={'/fav'} >
            <li>
              <p
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Favourites
              </p>
            </li>
            </Link>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
