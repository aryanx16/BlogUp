import { Link } from "react-router-dom";
import Animated from "./Animated";
import AnimatedRight from "./AnimatedRight";
import { Avatar } from "./BlogCard";

export default function Appbar() {
    return (
        <>
            <div className="sticky top-0 overflow-hidden bg-white shadow-lg   font-nunito flex justify-between py-3 px-5 mb-10 border-b  ">

                <Link to={"/blogs"}>
                <div className="flex cursor-pointer">
                    <Animated>

                        <div className="font-nunito font-bold text-3xl bg-black  text-white px-1 hover:-rotate-2">M</div>
                    </Animated>
                    <AnimatedRight>

                        <div className=" text-3xl ">edium</div>
                    </AnimatedRight>
                </div>
                </Link>
                <div className="flex">
                    <Link to={"/publish"}>
                <button type="button" className="text-white bg-black border border-gray-300 focus:outline-none hover:bg-gray-950 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 ">New Post</button>
                    </Link>

                    <div className="flex justify-center flex-col cursor-pointer">
                        <div>
                            <Avatar name="Aryan" size={10} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}