import { Quote } from "../components/Quote"
import { AuthSignIn } from "../components/AuthSignIn"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../AtomStore/LoginAuth";

export const Signin = () =>{
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
            <AuthSignIn />
          </div>
          <div className="invisible lg:visible">
            <Quote />
          </div>
        </div>
      ) : null}
    </div>
  );
}