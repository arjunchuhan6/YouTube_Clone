import React from 'react';
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

function NotFound() {
    const err = useRouteError();
    return (
        <div className='relative font-bold'>
            <img src="../../picture/404-Not-Found.png" alt="page not found" width="750px"/>
                <p className="absolute p-1 bottom-20">OOPs</p>
                <p className="absolute p-1 bottom-16">{err.status}</p>
                <p className="absolute p-1 bottom-10">Page {err.statusText}</p>
                <p className="absolute p-1 bottom-5">{err.data}</p>
                <p>
                <Link to="/" className='flex text-center'>
                    <button className=" hover:border-2 hover:border-black hover:rounded-md p-1 absolute bottom-0 items-center justify-center"> ↩ Back to Home</button>
                </Link>
                </p>
        </div>
    )
};
export default NotFound;