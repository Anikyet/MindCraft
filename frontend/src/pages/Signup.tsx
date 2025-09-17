import {  useRecoilValue } from "recoil"
import { AuthSignUp } from "../components/AuthSignUp"
import { Quote } from "../components/Quote"
import { authAtom } from "../AtomStore/LoginAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"


export const Signup = () => {
  const auth = useRecoilValue(authAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [auth.isLoggedIn, navigate]);

  return (
    <div className="">
      {!auth.isLoggedIn ? (
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="col-span-1">
            <AuthSignUp />
          </div>
          <div className="invisible lg:visible">
            <Quote />
          </div>
        </div>
      ) : null}
    </div>
  );
};