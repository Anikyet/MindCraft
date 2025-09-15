import { AuthSignUp } from "../components/AuthSignUp"
import { Quote } from "../components/Quote"


export const Signup = () =>{
    return <div className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div className=" col-span-1"> <AuthSignUp /></div>
            <div className="invisible lg:visible"><Quote/></div>
        </div>
    </div>
}