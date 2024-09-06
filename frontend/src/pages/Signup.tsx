import Auth from "../components/Auth";
import Quote from "../components/Quote";
import Animated from "../components/Animated";
import Appbar from "../components/Appbar";

export default function Signup(){
   
    return(
        <>
        <Appbar></Appbar>
        <div className="font-nunito grid lg:grid-cols-2">
          
            {/* <Animated> */}
                
            <Auth type="signup"/>
            {/* </Animated> */}
            
            <div className="invisible lg:visible">
            <Quote/>
            </div>
        </div>
        </>
    )
}