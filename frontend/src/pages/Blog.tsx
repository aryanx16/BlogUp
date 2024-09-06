import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";

export default function Blog() {
    const { id } = useParams();
    console.log("blog id :")
    console.log(id);
    const { loading, blog ,userId } = useBlog({ id: id || "" });
    console.log(blog)

    // console.log("=============================================")
    // console.log(userId);
    // console.log("=============================================")
    // console.log(blog?.authorId);
    // console.log("=============================================")
    if (loading) {
        return (
            <>
            <Appbar/>
            <Spinner/>
            </>
        )
    }
    if (!blog) {
        return (<>
            <div>kkk</div>
        </>)
    }
    return (
        <>

            <FullBlog  userId={userId?userId:-1} blog={blog} />

        </>
    )
}