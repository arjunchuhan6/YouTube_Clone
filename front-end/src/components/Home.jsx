import React, { useContext, useState } from 'react'
import { videosData } from './videosData';
import EachVideo from "./EachVideo";
import { SearchContext } from '../sidebar/Sidebar';
import { SideBarContext } from '../sidebar/Sidebar';
import Sidebar from "./Sidebar";

function Home() {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const { isSidebarOpen } = useContext(SideBarContext);
  const [showMore, setShowMore] = useState(false);


  const filteredData = videosData.filter(
    item => item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const buttons = [
    { label: "Story", id: 1 },
    { label: "Node.js", id: 2 },
    { label: "Javascript", id: 3 },
    { label: "CSS", id: 4 },
    { label: "Python", id: 5 },
    { label: "Earning", id: 6 },
    { label: "Anime", id: 7 },
    { label: "DevOps", id: 8 },
    { label: "AI", id: 9 },
    { label: "Hacking", id: 10 }
  ];

  let visibleButtons = isSidebarOpen ? (showMore ? buttons.slice(6, 10) : buttons.slice(0, 6)) : (showMore ? buttons.slice(7, 10) : buttons.slice(0, 7))
  return (
    <div className={isSidebarOpen ? "flex" : undefined}>
      <div>
        {isSidebarOpen && <Sidebar />}
      </div>
      <div className="w-full">
        <div className="ml-16 h-10 mt-20 text-2xl">

          <div>
            <button onClick={() => setSearchQuery('')} className='bg-slate-200 rounded-xl  px-3 justify-content-center py-1 mx-4 hover:border hover:border-gray-500' >
              All
            </button>
            {visibleButtons.map((buttons) => (
              <button key={buttons.id} className="bg-slate-200 rounded-xl px-3 py-1 mx-4 justify-content-center hover:border hover:border-gray-500"
                onClick={() => {
                  searchQuery(buttons.label);
                  console.log(buttons.label);
                }
                }> {buttons.label}</button>
            ))}
            <button onClick={() => { setShowMore(!showMore) }} className='bg-slate-200 rounded-xl justify-content-center px-3 py-2 mx-5 hover:border hover:border-gray-500' >
              {showMore ?
                <img src="../../picture/left-arrow.png" alt="arrow" width="20px" height="20px" /> : <img src="../../picture/right-arrow.png" alt="arrow" width="20px" height="20px" />
              }
            </button>
          </div>

        </div>
        <div className="grid grid-cols-3 mt-16 place-items-center">
          {filteredData.map((item) => (
            <EachVideo items={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
};

export default Home;