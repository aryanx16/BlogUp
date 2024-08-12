import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
export interface Blogtypes{
    "content" : string,
    "title": string,
     "id":number,
     "author":{
        "name":string,
     }
}


export const  useBlogs=()=>{
    const [loading,setloading] = useState(true);
    const [blogs,setblogs] = useState<Blogtypes[]>([])
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        }).then(response=>{
            setblogs(response.data.blogs)
            setloading(false)
        })
    },[])
    return{
        loading,
        blogs
    }
}
export const useBlog=({id}:{id:string})=>{

    const [loading,setloading] = useState(true);
    const [blog,setblog] = useState<Blogtypes>()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response=>{
            setblog(response.data.blog)
            console.log(response)
            setloading(false)
        })
    },[])
    return{
        loading,
        blog
    }
}