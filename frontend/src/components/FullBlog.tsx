import { Link } from "react-router-dom";
import { Blogtypes } from "../hooks";
import Appbar from "./Appbar";

export default function FullBlog({ blog ,userId }: { blog: Blogtypes ; userId:number}) {
    console.log("------------------------------------")
    console.log("userid ")
    console.log(userId);
    console.log("------------------------------------")
    console.log(userId==blog?.authorId)

    function handleEdit(){

    }

    return (
        <>
            <Appbar />
            <div className="font-nunito grid md:grid-cols-12  px-8 sm:px-28 pt-5 ">
                <div className="col-span-8 border-b-2 py-3 md:border-none" >
                    <div className="font-bold text-5xl">
                        {blog.title}
                    </div>
                    <div className="font-light">Pubished on 3rd July 2004</div>
                    <div className="mt-3 font-normal text-2xl">{blog.content}</div>
            {blog.authorId==userId? <div className="flex gap-6 mt-6 justify-center items-center">
                <Link to={`/edit/${blog.id}`}>
                <div onClick={handleEdit}  className="bg-black text-white px-4 py-1 rounded-full border-2 border-black font-semibold hover:cursor-pointer text-xl hover:bg-white hover:text-black hover:border-2">
                    Edit
                </div>
                </Link>
                
                <div className="bg-black text-white cursor-pointer px-4 py-1 rounded-full text-xl border-2 font-semibold border-black hover:bg-white hover:text-black hover:border-2">
                    Delete
                </div>
            </div>:<div></div>}
                </div>
                <div className="col-span-4  sm:mx-10 ">
                    <div className="sm:mx-10  my-2 w-full">
                        <div className="text-xl">Author</div>
                        <div className="text-3xl font-bold">
                            @{blog.author.name}
                        </div>
                        <div className="">Mr.Aryan is the sensation of this new technical world , his thinking and approach to solve the new world technical problems has changed many minds .
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}