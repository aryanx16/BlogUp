import { Link } from "react-router-dom";

interface BlogCardProps {
    id:number,
    authorname: string;
    title: string;
    content: string;
    publishedDate: string;
}
export function Avatar({ name ,size=6 }: { name: string ,size?:number}) {
    const sizeInPixels = `${size * 4}px`;
    return (

        <div className={` mx-1 inline-flex items-center justify-center overflow-hidden bg-black rounded-full `} style={{ width: sizeInPixels, height: sizeInPixels }} >
            <span className="text-lg text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>

    )
}
export default function BlogCard({
    id,
    authorname,
    title,
    content,
    publishedDate,

}: BlogCardProps) {
    return (
        <>
        <Link to={`/blog/${id}`}>
        <div className="font-nunito border-b mb-2 pb-1 cursor-pointer " >
            <div className="flex items-center">
                <div className="font-normal"><Avatar name={authorname} />{authorname}</div>
                <div className="flex justify-center flex-col px-2"> <Circle /></div>
                <div className="font-extralight">{publishedDate}</div>
            </div>
            <div className="text-3xl font-semibold">
                {title}
            </div>
            <div className="text-lg text-slate-700">
                {content.slice(0, 100) + "..."}
            </div>
            {/* <div className="bg-slate-6 00  h-0.5 w-full"></div> */}
        
        </div>
        </Link>
        </>
    )
}

export function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-black"></div>
    )
}