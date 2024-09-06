import { Link } from "react-router-dom";
import Animated from "./Animated";
import { useEffect, useState } from "react";
import Dropdown from "./Threedots";




export default function Appbar() {
   
    const [theme, setTheme] = useState(() => {
        // Get the stored theme from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };
    useEffect(() => {
        document.documentElement.classList.add(theme);
        document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');

    }, [theme]);
    return (
        <>

            
            <div className="w-full sticky top-0 z-50 font-nunito flex justify-between  pt-4 pb-4 px-5 bg-white dark:bg-blu dark:shadow-black dark:shadow-2xl shadow-md ">

                <Link to={"/blogs"}>
                    <div className="flex cursor-pointer">
                        <Animated>

                            <div className=" rounded-md  font-bold text-3xl bg-black  text-white px-1 dark:drop-shadow-custom hover:-rotate-2 dark:bg-white dark:text-black font-nunito">M</div>
                        </Animated>
                

                        <div className=" text-3xl dark:text-white  dark:drop-shadow-custom font-semibold font-sans"> edium</div>

                    </div>
                </Link>
                <div className="flex gap-1">
                    
                    <Link to={"/publish"}>
                        <button className="hidden sm:inline-flex h-full animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                            New Post
                        </button>

                    </Link>
                    <button
                        onClick={toggleTheme}
                        className="  text-black dark:text-white rounded"
                    >
                        {theme === 'dark' ? <div className="flex h-full animate-shimmer items-center justify-center rounded-full border border-slate-800  px-1 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        </div> :  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-black">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                        </svg>
                        }
                    </button>
                    <Dropdown/>
                </div>

            </div>


        </>
    )
}