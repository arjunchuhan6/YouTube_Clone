import React, { useContext, useState, useEffect } from 'react'

import EachVideo from "./EachVideo";
import { SearchContext } from '../sidebar/Sidebar';
import { SideBarContext } from '../sidebar/Sidebar';
import Sidebar from "./Sidebar";
import {useDispatch,useSelector} from "react-redux";
import { fetchVideos } from '../sidebar/videoSlice';


function Home() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const { isSidebarOpen } = useContext(SideBarContext);
  const [showMore, setShowMore] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");

  const dispatch=useDispatch();
  const { videos,loading,error }=useSelector(state=>state.video);

  useEffect(()=>{
    dispatch(fetchVideos())
  }, [dispatch]);

  if(loading){
    return <p>please wait while loading..</p>
  }

  if(error){
    return <p>error ...</p>
  }


// Filter data based on the search title and search category
const filteredData = videos.filter(item => {
  const matchesCategory = searchCategory ? item.category.toLowerCase() === searchCategory.toLowerCase() : true;
  const matchesTitle = item.title.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesTitle;
});


  const buttons = [
    { label: "Story", id: 1 },
    { label: "Education", id: 2 },
    { label: "Technology", id: 3 },
    { label: "Earning", id: 4 },
    { label: "Anime", id: 5 },
    { label: "Music", id: 6 },
    { label: "Hacking", id: 7 }
  ];

  let visibleButtons = isSidebarOpen ? (showMore ? buttons.slice(6, 7) : buttons.slice(0, 6)) : (showMore ? buttons.slice(6, 7) : buttons.slice(0, 7))
  return (
    <div className={isSidebarOpen ? "flex" : undefined}>
      <div>
        {isSidebarOpen && <Sidebar />}
      </div>
      <div className="w-full">
        <div className="ml-16 h-10 mt-20 text-2xl">
            <div className="hidden lg:block">
              <button className="bg-slate-200 rounded-lg px-3 py-1 mx-4 hover:border hover:border-black" onClick={() => { setSearchQuery(''); setSearchCategory('') }}>All</button>
              {/* map on the buttons array */}
              {visibleButtons.map((button) => (
                <button
                  key={button.id}
                  className={isSidebarOpen ? "bg-slate-200 rounded-lg px-3 py-1 mx-2.5 hover:border hover:border-black" : "bg-slate-200 rounded-lg px-3 py-1 mx-3 hover:border hover:border-black"}
                  onClick={() => {
                    setSearchQuery("")
                    setSearchCategory(button.label)
                  }}
                >
                  {button.label}
                </button>
              ))}
              <button className="bg-slate-200 rounded-lg px-3 py-2 mx-5 hover:border hover:border-black"
              onClick={() => setShowMore(!showMore)}> 
              {showMore ? <img src="../../picture/left-arrow.png" width="20px" height="20px" /> : <img src="../../picture/right-arrow.png" width="20px" height="20px" />}</button>
            </div>
            
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 lg:mt-16 mb-2 m-1 lg:ml-5 place-items-center">
            {filteredData.map((item) => (
              <EachVideo items={item} key={item._id} />
            ))}
          </div>
      </div>
    </div>
  )
};

export default Home;