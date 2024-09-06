import { useEffect, useState } from "react";

export default  function(){
    const [theme] = useState(() => {
        // Get the stored theme from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });
    useEffect(() => {
        document.documentElement.classList.add(theme);
        document.documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');

    }, [theme]);
    return(
        <div className="flex h-screen justify-center items-center dark:bg-blu">

            <div className="border-gray-300 h-14 w-14 animate-spin rounded-full border-4 border-t-black" />
            </div>
    )
}