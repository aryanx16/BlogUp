import Animated from "../components/Animated";
import Appbar from "../components/Appbar";
import Auth from "../components/Auth";
import Quote from "../components/Quote";

export default function Signin(){
    return(<>
    <Appbar></Appbar>
    <div className="font-nunito grid lg:grid-cols-2">
      
            {/* <Animated> */}

            <Auth type="signin"/>
            {/* </Animated> */}
      
            <div className="invisible lg:visible">
            <Quote/>
            </div>
        </div>
    </>)
}