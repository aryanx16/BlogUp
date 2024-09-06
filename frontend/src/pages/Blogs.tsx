
import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";

import { Link } from "react-router-dom";



export default function Blogs() {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return (
            <>
            <div className=" dark:bg-blu">

                <div className="animate-pulse h-16 flex items-center mx-5 rounded-full w-full">
                    <div className="flex justify-between w-full">
                        <div className="bg-gray-300 w-24 h-8 rounded-lg"></div>
                        <div className=" flex gap-15 mx-5 ">
                            <div className="bg-gray-300 rounded-lg w-20 h-8 mx-4"></div>
                            <div className="bg-gray-300 rounded-full w-8 h-8 mx-5"></div>
                        </div>
                    </div>
                </div>
                <div className="mt-15">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
            </>
        )

    }
   
    return (
        <>
            {/* <AuroraBackground className="relative"> */}

            <Appbar />
            {/* <TracingBeam className="relative"> */}
            {/* <div className="flex  justify-center min-h-screen pt-10 z-0 dark:bg-bg"> */}
            <div className="flex  justify-center min-h-screen pt-10 z-0 dark:bg-blu">

                <div className="sm:max-w-5xl w-80 p-2 sm:w-screen">
                    {blogs.map(blog =>
                            
                        <BlogCard key={blog.id} id={blog.id} authorid={blog.author.id} authorname={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} createdAt={blog.createdAt} />
                        // <BlogCard authorname={"Anonymous"} title={"kfjdf"} content={"kfjdf"} publishedDate={"3rd july 2004"}/>

                    )}

                </div>
            

            </div>
            {/* <div className="sm:hidden fixed bottom-4 right-4 h-12 w-12 bg-black text-3xl text-white flex items-center justify-center rounded-full">
                +
            </div> */}
            <Link to={"/publish"}>
            <div className="sm:hidden fixed justify-center items-center  shadow-black p-3 bottom-8 right-3 text-4xl rounded-full bg-white border  dark:bg-white dark:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="28" height="28" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
            </div>
            </Link>
            {/* </TracingBeam> */}
            {/* </AuroraBackground> */}
        </>
    )
}