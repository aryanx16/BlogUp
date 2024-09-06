import { useNavigate, useParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Spinner from "../components/Spinner";
import BlogCard from "../components/BlogCard";
import { toast } from "react-toastify";

interface User {
    name: string,
    id: number
}
interface userposts {
    id: number;
    author: {
        id: number;
        name: string;
    }
    title: string;
    content: string;
    createdAt:string;
};

export default function () {
    const [user, setuser] = useState<User>()
    const [userposts, setuserposts] = useState<userposts[]>([])
    const [theme] = useState('dark');
    const [userid, setuserid] = useState();
    const  navigate = useNavigate();
    useEffect(() => {
        document.documentElement.classList.add(theme);
        document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');

    }, [theme]);

    const { id } = useParams();
    useEffect(() => {
        console.log("---------------------?------------")
        axios.get(`${BACKEND_URL}/api/v1/user/profile/${id}`,
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
            .then(response => {
                setuserposts(response.data.userposts)
                setuserid(response.data.mainuserid)
                setuser(response.data.user)
            })
        }, [])
    if (!user) {
        return <>
            <Spinner />
        </>
    }
    function handlelogout(){
        localStorage.setItem("token","")
        toast.success("Logout Successfully")
        navigate("/blogs")
    }
    return (
        <>
            <div className="dark:bg-blu h-screen  dark:text-white">
                <Appbar />

                <div className="flex justify-center mt-10 items-center gap-5 w-full">

                    <div className=" p-8 shadow-md   dark:shadow-black dark:shadow-md">
                        <div className="flex justify-center items-center">
                            <svg className="w-28 h-28 border-2 rounded-full bg-slate-300 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="text-5xl flex justify-center items-center">
                            {user?.name}
                        </div>
                        {
                            userid===user.id &&
                            <div onClick={handlelogout} className="flex justify-center items-center mt-6">
                                <button className="border px-4 py-1 text-xl rounded-full bg-black text-white font-semibold">Logout</button>
                            </div>
                        }
                    </div>
                </div>
                {userposts &&
                    <div>
                        <div className="flex mt-16 text-3xl font-semibold justify-center items-center">
                            Posts
                        </div>
                        <div className="flex justify-center z-0 dark:bg-blu">
                            <div className="sm:max-w-5xl w-80 p-2 sm:w-screen">
                                {userposts.map(blog =>

                                    <BlogCard key={blog.id} id={blog.id} authorid={user.id} authorname={user.name || "Anonymous"} title={blog.title} content={blog.content} createdAt={blog.createdAt} />

                                )}


                            </div>
                        </div>
                    </div>}

            </div>
        </>
    )
}