import { Navigate, useParams } from "react-router-dom"
import { useBlog } from "../hooks";
import { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import axios from "axios";

export default function () {
    const { id } = useParams();
    console.log(id)
    const idd = id ? parseInt(id) : 1;
    console.log("idd:")
    console.log(idd)
    const [redirect, setRedirect] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const { blog } = useBlog({ id: id || "" })
    useEffect(() => {
        if (blog) {
            setTitle(blog.title || "none");
            setContent(blog.content || "none");
        }
    }, [blog]);
    //@ts-ignore
    async function handleEditPost(e) {
        e.preventDefault()
        const response = await axios.put(`${BACKEND_URL}/api/v1/blog/`, {
            title, content, id: idd
        },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }

        )
        console.log(response);
        setRedirect(true)
    }
    if(redirect){
        return(
            <Navigate to={`/blog/${idd}`}></Navigate>
        )
    }
    return (
        <>
            <div>
                <Appbar />
                <div className="flex pt-36 flex-col dark:text-white p-8 items-center w-full h-screen gap-2 dark:bg-gradient-to-r from-stone-800 to-stone-800">
                    <div className="text-3xl font-bold">Edit Post</div>
                    <div className="max-w-screen-lg w-full">
                        <label htmlFor="title" className="mx-2 font-semibold text-xl">Title</label>
                        <textarea onChange={(e) => setTitle(e.target.value)} className="border-2 dark:text-black border-black rounded-md w-full" name="title" placeholder=" Title" id="title" value={title}></textarea>

                        <label htmlFor="Content" className="mx-2 font-semibold text-xl">Content</label>
                        <textarea onChange={(e) => { setContent(e.target.value) }} value={content} className="dark:text-black border-2 border-black rounded-md w-full min-h-36" name="content" placeholder=" Content" id="">{blog?.content}</textarea>
                        <button onClick={handleEditPost} className="text-white bg-black border border-gray-300 focus:outline-none hover:bg-gray-950 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ">Save Changes</button>
                    </div>

                </div>
            </div>
        </>
    )
}