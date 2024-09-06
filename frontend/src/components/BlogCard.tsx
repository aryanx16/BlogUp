import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";


interface BlogCardProps {
    id: number,
    authorname: string;
    title: string;
    content: string;
    createdAt: string;
    authorid: number;
}
interface usertypes{
    id:number;
    name:string;
}
export function Avatar({ name, size = 6 }: { name: string, size?: number }) {
    const sizeInPixels = `${size * 4}px`;
    return (

        <div className={` sm:inline-flex h-full animate-shimmer rounded-full border border-slate-800  px-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 inline-flex items-center mr-1 justify-center bg-black  `} style={{ width: sizeInPixels, height: sizeInPixels }} >
            <span className="text-lg font-nunito text-white">{name[0]}</span>
        </div>

    )
}
export default function BlogCard({
    id,
    authorname,
    authorid,
    title,
    content,
    createdAt


}: BlogCardProps) {
    const [user, setuser] = useState<usertypes>()
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    function handleBlog(){
        if(!token){
            toast.error("Please Login to view full post")
            navigate("/signin")
            
        }else{
            navigate(`/blog/${id}`)
        }
    }
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/user/info`)
            .then(response => {
                console.log(response.data)
                setuser(response.data)
                console.log(user)
            })
    }, [])
    console.log(authorid)
    return (
        <>
            {/* <div className="font-nunito border-b mb-2 pb-1 cursor-pointer " > */}
            <div className="overflow-hidden font-nunito border px-8 sm:px-14 shadow-md rounded-md  dark:border-2 dark:shadow-black dark:shadow-2xl dark:border-slate-900  py-2 mb-2 dark:mb-6 pb-1 cursor-pointer " >
                <div className="flex items-center">
                    <div className="font-normal text-lg dark:text-white m-1"><Link to={`/profile/${authorid}`}> <Avatar name={authorname} size={8} />  {authorname.slice(0,8)}</Link></div>
                    <div className="flex justify-center flex-col pl-1 pr-2"> <Circle /></div>
                    <div className="font-extralight dark:text-white">{createdAt.slice(0, 10)}</div>
                </div>
                {/* <Link to={`/blog/${id}`}> */}
                <div onClick={handleBlog}>

                    <div className="text-3xl p-1 font-semibold dark:text-white">
                        {title.slice(0, 100) + "..."}
                    </div>
                    <div className="text-xl pb-2 px-1 text-slate-700 dark:text-slate-400">
                        {content.slice(0, 150) + "..."} <span className="text-blue-500">read more</span>
                    </div>
                    {/* <div className="bg-slate-6 00  h-0.5 w-full"></div> */}
                </div>

                {/* </Link> */}
            </div>
        </>
    )
}

export function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-black dark:bg-white"></div>
    )
}