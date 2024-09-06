import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
export interface Blogtypes{
    "content" : string,
    "title": string,
     "id":number,
     "authorId":number,
     "createdAt":string,
     "author":{
        "name":string,
        "id":number,
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
            console.log(response.data.blogs)
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
    const [userId ,setuserId] = useState();
    const [blog,setblog] = useState<Blogtypes>()
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/mid/${id}`,{
            headers:{
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response=>{
            setblog(response.data.blog)
            setuserId(response.data.userId)
            console.log("++++++=======++++++++++")
            console.log(response.data)
            console.log("++++++=======++++++++++")
            setloading(false)
        })
    },[])
    return{
        loading,
        blog,
        userId
    }
}