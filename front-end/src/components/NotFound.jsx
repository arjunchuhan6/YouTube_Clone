import React from 'react';
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

function NotFound() {
    const err = useRouteError();
    return (
            <div className='relative'>
            <img src="../../picture/404-page-not-found.jpg" alt="page not found" height="100%"/>
            <h2 className=" text-white absolute p-1 bottom-20">OOPs</h2>
            <p className="font-bold text-white absolute p-1 bottom-15">{err.status}</p>
            <p className="font-bold text-white absolute p-1 bottom-10">Page {err.statusText}</p>
            <p className="font-bold text-white absolute p-1 bottom-5">{err.data}</p>
            <Link to="/" className='flex text-center'>
                <button className="text-white hover:border-2 hover:border-black hover:rounded-md p-1 absolute bottom-0 justify-items-center"> ↩ Back to Home</button>
            </Link>
            
        </div>
    )
};
export default NotFound;