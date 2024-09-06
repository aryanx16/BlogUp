import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Avatar } from "./BlogCard";
import { BACKEND_URL } from "../config";
import axios from "axios";
interface Usertypes{
  id:number,
  name:string,
}
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user ,setUser] = useState<Usertypes>()
  const token = localStorage.getItem("token")
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the dropdown
    axios.get(`${BACKEND_URL}/api/v1/user/info`,{
      headers:{
        Authorization:localStorage.getItem("token")
      }
    })
    .then(response=>{
      console.log(response.data)
      setUser(response.data)
    })

    
    document.addEventListener("mousedown", handleClickOutside);
    
    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);
  
  return (
    <div className="relative  text-left flex justify-center dark:text-white items-center" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-white font-bold rounded focus:outline-none"
      >
        <Avatar name={`${user?.name||"#"}`} size={9} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 rounded-md mt-40 w-48 dark:bg-slate-950 dark:text-white  bg-white border border-gray-200 shadow-lg">
          {token? 
          <div>
          <Link to={`/profile/${user?.id}`}>
            <div className="block px-4 py-2 rounded-md text-gray-800 dark:text-white dark:hover:bg-slate-800 hover:bg-gray-100">Profile</div>
          </Link>
          
          <Link to={"/blogs"}>
            <div
              onClick={() => {
                localStorage.setItem("token", "");
                toast.success("Logout Successfully!");
                toggleDropdown();
                setUser(undefined)
              }}
              className="block px-4 py-2 text-gray-800 rounded-md dark:text-white dark:hover:bg-slate-800 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </div>
          </Link>
          </div>
          
          :
          <div>
             <Link to={"/signup"}>
            <div className="block px-4 py-2 text-gray-800 rounded-md dark:text-white dark:hover:bg-slate-800 hover:bg-gray-100">Signup</div>
          </Link>
          <Link to={"/signin"}>
            <div className="block px-4 py-2 text-gray-800 rounded-md dark:text-white dark:hover:bg-slate-800 hover:bg-gray-100">Signin</div>
          </Link>
          </div>
          }
        </div>
      )}
      
    </div>
  );
};

export default Dropdown;
