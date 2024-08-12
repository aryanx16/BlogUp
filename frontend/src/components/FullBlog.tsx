import { Blogtypes } from "../hooks";
import Appbar from "./Appbar";

export default function FullBlog({ blog }: { blog: Blogtypes }) {
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