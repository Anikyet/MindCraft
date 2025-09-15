import { Quote } from "../components/Quote"
import { AuthSignIn } from "../components/AuthSignIn"

export const Signin = () =>{
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 ">
            <div className=" col-span-1"> <AuthSignIn /> </div>
            <div className="invisible lg:visible"><Quote/></div>
        </div>
    </div>
}