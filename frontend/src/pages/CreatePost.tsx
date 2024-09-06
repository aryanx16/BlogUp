import { useState } from "react";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function CreatePost() {
    const [redirect,setRedirect] = useState(false)
    const[title,setTitle] = useState("")
    const navigate = useNavigate()
    const [content , setContent] = useState("")
    const [blogid,setblogid] = useState()
    async function handleCreatePost(){
        console.log("-----------------------------")
        const token = localStorage.getItem("token")
        if(token){
            const response =await axios.post(`${BACKEND_URL}/api/v1/blog/mid/`,
                {title,content},
                {
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                }
            )
            toast.success("Post Created Successfully!")
            setTimeout(() => {
                setRedirect(true);
            }, 2000);
            setblogid(response.data.id);
            console.log(response);
        }else{
            toast.error("Please Signin!")
            navigate("/signin")
        }
    }
    if(redirect){
        return(
            <Navigate to={`/blog/${blogid}`}/>
        )
    }
    return (<div>
        <Appbar />
        <div className="flex flex-col pt-28 p-8 dark:text-white items-center w-full h-screen gap-2 dark:bg-blu ">
        
            <div className="text-4xl font-bold">New Post</div>
            <div className="max-w-screen-lg w-full">
                <label htmlFor="title" className="mx-2 font-semibold text-xl">Title</label>
                <textarea onChange={(e)=>setTitle(e.target.value)} className="mb-3 dark:border-white  dark:text-black border-2 border-black rounded-md w-full" name="title" placeholder=" Title" id="title"></textarea>
                <label htmlFor="Content" className="mx-2 font-semibold text-xl">Content</label>
                <textarea onChange={(e)=>{setContent(e.target.value)}} className="border-2 dark:text-black border-black rounded-md w-full min-h-36" name="content" placeholder=" Content" id=""></textarea>
                <button onClick={handleCreatePost} className="text-white bg-black border border-gray-300 focus:outline-none hover:bg-gray-950 focus:ring-4  focus:ring-gray-100 font-medium rounded-lg text-lg px-5 py-2 me-2 ">Publish</button>
            </div>
        </div>
    </div>
    )
}