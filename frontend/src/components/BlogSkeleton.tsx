import { useEffect, useState } from "react";

export default function () {
    const [theme, setTheme] = useState(() => {
        // Get the stored theme from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });
    useEffect(() => {
        document.documentElement.classList.add(theme);
        document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
    }, [theme]);
    return (<div className="dark:bg-blu">
            
        <div role="status"  className="animate-pulse flex justify-center items-center  ">
            <div className="shrink-0 ">
                <span className="size-12 block bg-gray-300 rounded-full"></span>
            </div>

            <div className="ms-4 mt-2 w-2/4">
                <p className=" bg-gray-300 rounded-full "></p>

                <ul className="mt-5 space-y-3">
                    <li className="w-full  bg-gray-500 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-300 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-300 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-300 rounded-full"></li>
                    <li className="w-full h-4 bg-gray-300 rounded-full"></li>
                </ul>
            </div>
        </div>

    </div>
       
    )
}