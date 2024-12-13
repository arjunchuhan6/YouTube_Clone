import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { SearchContext } from "../sidebar/Sidebar";
import { SideBarContext } from "../sidebar/Sidebar";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;


function Header(){
    const [inputValue, setInputValue]=useState('');
    const [listening,setListening]=useState(false);
    const { setSearchQuery }=useContext(SearchContext);
    const { isSidebarOpen, setIsSidebarOpen } = useContext(SideBarContext);


    // microphone for searching 
    const startListening=()=>{
        if(recognition){
            recognition.start();
            setListening(true);
        }
        else{
            alert("Speech Recognition is not support in your browser.");
        }
    };

    if(recognition){
        recognition.onresult=(event)=>{
            const transcript=event.result[0][0].transcript;
            setSearchQuery(transcript);
            setInputValue(transcript);
            setListening(false);
        };
        recognition.onend=()=>{
            setListening(false);
        };
    }

    //Searching Function
    function handleSearch(){
        setSearchQuery(inputValue);
    }

    function toggleSidebar(){
        setIsSidebarOpen(!isSidebarOpen);
    };

    return(
        <div className="flex justify-between mt-5 items-center">
            <button onClick={toggleSidebar} className="ml-5 h-10 w-10">
                <img src="../../picture/hamburger.png" alt="menu-button" width="48" height="40"/>
            </button>
            <div className="flex">
                <img src="../../picture/youtube.png" alt="logo" width="50px" height="48px"/>
                <p className="mt-2 ml-25 text-3xl ml-2">Youtube<sup>In</sup></p>
            </div>
            <div className="mr-19 mt-2">
                <input type="text" value={inputValue} className="w-200 h-10 border border-black rounded-md p-1 text-xl" onChange={(e)=>setInputValue(e.target.value)} placeholder="Search.."/>

                <button className="relative right-10 border-1 border-black p-2" onClick={handleSearch}>
                    <img src="../../picture/search.png" alt="Searching bar" width="25px" height="25px"/>
                </button>
                <button onClick={startListening} className="mr-1 relative top-1 border border-black rounded-full p-1">
                    {!listening?
                    <img src="../../picture/microphone.png" alt="microphone" width="25px" height="30px"/>:    
                    <img src="../../picture/voice-search.png" alt="voice Searching" width="25px" height="30px"/>    
                }
                </button>
                {!listening?"":
                <span>Listening please Speak little Loud</span>
                }
            </div>
            <div className="mr-10 mt-2">
                <Link to="/login">
                    <button className="border border-black px-3 py-2 rounded-md text-xl bg-sky-800 text-white">
                        Login
                    </button>
                </Link>
            </div>
        </div>
    )

}
export default Header;