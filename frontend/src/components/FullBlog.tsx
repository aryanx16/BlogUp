import { Link, Navigate } from "react-router-dom";
import { Blogtypes } from "../hooks";
import Appbar from "./Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FullBlog({ blog, userId }: { blog: Blogtypes; userId: number }) {
    const [redirect, setredirect] = useState(false);
    // console.log("------------------------------------")
    // console.log("userid ")
    // console.log(userId);
    // console.log("------------------------------------")
    // console.log(userId==blog?.authorId)
    const idd = blog?.id
    const iddd = Number(idd)
    async function handleDelete() {
        const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${iddd}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        console.log(response)
        toast.success("Post deleted successfully!");
       
            setredirect(true);
       // 2 seconds delay
    }
    if (redirect) {
        return (
            <Navigate to={`/blogs`}></Navigate>
        )
    }
    return (
        <>
            <Appbar />
            <div className="min-h-screen dark:bg-blu">

            <div className="font-nunito grid md:grid-cols-12   px-8 sm:px-28 pt-5 dark:bg-blu">
                <div className="col-span-8 border-b-2 py-3 md:border-none overflow-hidden" >
                    <div className="font-bold text-5xl dark:text-white">
                        {blog.title}
                    </div>
                    <div className="font-light mt-2 dark:text-zinc-400">Pubished on {blog.createdAt.slice(0,10)}</div>
                    <div className="mt-3 font-normal text-2xl dark:text-white">{blog.content}</div>
                    {blog.authorId == userId ? <div className="flex gap-6 mt-6 justify-center items-center">
                        <Link to={`/edit/${blog.id}`}>
                            <div className="bg-black  text-white px-4 py-1 rounded-full border-2 border-black font-semibold hover:cursor-pointer text-xl hover:bg-white hover:text-black hover:border-2">
                                Edit
                            </div>
                        </Link>

                        <div onClick={handleDelete} className="bg-black text-white cursor-pointer px-4 py-1 rounded-full text-xl border-2 font-semibold border-black hover:bg-white hover:text-black hover:border-2">
                            Delete
                        </div>
                        
                    </div> : <div></div>}
                </div>
                <div className="col-span-4  sm:mx-10 dark:text-white">
                    <div className="sm:mx-10  my-2 w-full">
                        <div className="text-xl">Author</div>
                        <div className="text-3xl font-bold">
                            @{blog.author.name}
                        </div>
                        <div className="">{`Mr.${blog.author.name} is the sensation of this new technical world , his thinking and approach to solve the new world technical problems has changed many minds .`}</div>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}