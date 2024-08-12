import { useState } from "react";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function CreatePost() {
    const [redirect,setRedirect] = useState(false)
    const[title,setTitle] = useState("")
    const [content , setContent] = useState("")
    const [blogid,setblogid] = useState()
    async function handleCreatePost(){
        console.log("-----------------------------")
        const response =await axios.post(`${BACKEND_URL}/api/v1/blog/`,
            {title,content},
            {
                headers:{
                    Authorization:localStorage.getItem("token")
                }
            }
        )
        setRedirect(true);
        setblogid(response.data.id);
        console.log(response);
    }
    if(redirect){
        return(
            <Navigate to={`/blog/${blogid}`}/>
        )
    }
    return (<div>

        <Appbar />
        <div className="flex flex-col mt-32 p-8 items-center w-full h-screen gap-2 ">
            <div className="text-3xl font-bold">New Post</div>
            <div className="max-w-screen-lg w-full">
                <label htmlFor="title" className="mx-2 font-semibold text-xl">Title</label>
                <textarea onChange={(e)=>setTitle(e.target.value)} className="border-2 border-black rounded-md w-full" name="title" placeholder=" Title" id="title"></textarea>
                <label htmlFor="Content" className="mx-2 font-semibold text-xl">Content</label>
                <textarea onChange={(e)=>{setContent(e.target.value)}} className="border-2 border-black rounded-md w-full min-h-36" name="content" placeholder=" Content" id=""></textarea>
                <button onClick={handleCreatePost} className="text-white bg-black border border-gray-300 focus:outline-none hover:bg-gray-950 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ">Publish</button>

            </div>


        </div>
    </div>
    )
}