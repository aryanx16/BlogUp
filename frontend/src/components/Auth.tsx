import { SignupInput } from "@aryanx16/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LabeledInput from "./LabeledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
export default function Auth({ type }: { type: "signup" | "signin" }) {
    const navigate = useNavigate();
    const [postinputs, setpostinputs] = useState<SignupInput>({
        username: "",
        password: "",
        name: "",
    })
    //@ts-ignore
    async function handlesubmit(e){
        e.preventDefault();
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signin"?"signin":"signup"}`,postinputs)
            const jwt = await response.data;
            localStorage.setItem("token",jwt);
            {type==="signup"?navigate("/signin"):navigate("/blogs")}
        }catch(e){
            console.log(e);
            alert("error while sigining up")
        }

    }
    return (<>
        <div className=" h-screen  flex flex-col justify-center items-center">
            <div>
                <div className="px-10 pb-2 text-center" >

                    <div className=" text-4xl font-bold">{type==="signup"?"Create an account":"Login to your account"}</div>
                    <div className="">{type === "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link to={type === "signin" ? "/signup" : "/signin"}>{type==="signup"?"Login":"Register"}</Link> </div>
                </div>
                {type==="signup"? 
                <LabeledInput label="Name" placeholder="Aryan Babare" onchange={(e) => {
                    setpostinputs({
                        ...postinputs,
                        name: e.target.value
                    })
                }} />
            :null
            }
                <LabeledInput label="Username" placeholder="Username" onchange={(e) => {
                    setpostinputs({
                        ...postinputs,
                        username: e.target.value
                    })
                }} />
                <LabeledInput type="Password" label="Password" placeholder="Password" onchange={(e) => {
                    setpostinputs({
                        ...postinputs,
                        password: e.target.value
                    })
                }} />
                <button onClick={handlesubmit} type="button" className=" w-full text-base font-bold text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg  px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up":"Sign in"}</button>

            </div>
        </div>
    </>)
}

