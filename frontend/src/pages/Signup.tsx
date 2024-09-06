import Auth from "../components/Auth";
import Quote from "../components/Quote";

import Appbar from "../components/Appbar";

export default function Signup(){
   
    return(
        <>
        <Appbar></Appbar>
        <div className="font-nunito grid lg:grid-cols-2">
          
    
                
            <Auth type="signup"/>
         
            
            <div className="invisible lg:visible">
            <Quote/>
            </div>
        </div>
        </>
    )
}