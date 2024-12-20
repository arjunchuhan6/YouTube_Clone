import React, { useContext } from 'react'
import { SideBarContext } from "../sidebar/Sidebar.jsx"
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
function EachVideo(props) {

  const { isSidebarOpen } = useContext(SideBarContext);
  return (
    <div className="block sm:flex ml-1 md:block md:ml-0 text-center mb-20 sm:mb-0 md:mb-16 h-96" >
      <iframe src={props.items.url} controls width={isSidebarOpen ? "300px" : "350px"} height={isSidebarOpen ? "250px" : "300px"} className="rounded-md border border-black" />
      <Link to={`/viewvideo/${props.items._id}`} key={props.items._id}>
        <div className="flex flex-col items-start ml-0 md:ml-0 sm:ml-10 md:mt-0 sm:mt-10 mt-2 ">
          <h1 className="text-2xl text-start font-semibold w-80">{props.items.title}</h1>
          <p className="text-xl">{props.items.category}</p>
          <p className="text-xl">{props.items.views}Views</p>
        </div>
      </Link>
    </div>
  )
};

export default EachVideo