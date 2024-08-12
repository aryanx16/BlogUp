import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";

export default function Blog() {
    const { id } = useParams();
    console.log(id);
    const { loading, blog } = useBlog({ id: id || "" });
    // console.log(blog);
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
            No blogs present
        </>)
    }
    return (
        <>

            <FullBlog blog={blog} />

        </>
    )
}