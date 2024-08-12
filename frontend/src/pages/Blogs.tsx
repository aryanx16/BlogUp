
import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";

export default function Blogs() {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return (
            <>
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
                </div>
            </>
        )

    }
    return (
        <>
            <Appbar />

            <div className="flex justify-center">

                <div className="sm:max-w-3xl w-screen p-2 sm:w-screen">
                    {blogs.map(blog =>
                        <BlogCard id={blog.id} authorname={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishedDate={"3rd july 2004"} />
                        // <BlogCard authorname={"Anonymous"} title={"kfjdf"} content={"kfjdf"} publishedDate={"3rd july 2004"}/>

                    )}


                </div>
            </div>
        </>
    )
}