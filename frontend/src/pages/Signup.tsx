import { useState } from "react";
import Auth from "../components/Auth";
import Quote from "../components/Quote";
import AnimatedRight from "../components/AnimatedRight";
import Animated from "../components/Animated";

export default function Signup(){
   
    return(
        <>
        <div className="font-nunito grid lg:grid-cols-2">
          
            <Animated>
                
            <Auth type="signup"/>
            </Animated>
            
            <div className="invisible lg:visible">
            <Quote/>
            </div>
        </div>
        </>
    )
}