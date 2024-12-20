import React from 'react';
import { Link } from 'react-router-dom';
export default function Sidebar() {
    return (
        <div className=' hidden lg+:block w-55 h-auto box-border shadow-sm shadow-black p-4'>
            <ul>
                <Link to="/">
                    <li className="my-10 text-2xl flex h-8">
                        <img src='../../picture/home.png' width="25px" height="20px" className='mt-1 mr-2' alt='home icon' />
                        Home
                    </li>
                </Link>

                <li className="my-10 text-2xl flex h-8">
                    <img src='../../picture/video.png' width="25px" height="20px" className='mt-1 mr-2' alt='Video icon' />
                    Video
                </li>

                <li className="my-10 text-2xl flex h-8">
                    <img src='../../picture/subscribe.png' width="25px" height="20px" className='mt-1 mr-2' alt='Subscriber icon' />
                    Subscribers
                </li>

                <Link to="/myaccount">
                    <li className="my-10 text-2xl flex h-8">
                        Self
                        <img src='../../picture/right-arrow.png' width="25px" height="20px" className='mt-1 mr-2' alt='Arrow icon' />
                    </li>
                </Link>

                <li className="my-10 text-2xl flex h-8">
                    <img src='../../picture/history.png' width="25px" height="20px" className='mt-1 mr-2' alt='home icon' />
                    History
                </li>

                <li className="my-10 text-2xl flex h-8">
                    <img src='../../picture/playlist.png' width="25px" height="20px" className='mt-1 mr-2' alt='Arrow icon' />
                    Playlist
                </li>

                <li className="my-10 text-2xl flex h-8">
                    <img src='../../picture/clock.png' width="25px" height="20px" className='mt-1 mr-2' alt='home icon' />
                    Watch Later
                </li>

                <li className="my-10 text-2xl flex h-8">
                    <img src='../../picture/heart.png' width="25px" height="20px" className='mt-1 mr-2' alt='home icon' />
                    Liked Videos
                </li>

            </ul>
            <div>
                <span>Terms of Services</span><br />
                <span> Pricacy Policy and Safety</span>
                <h4>Arjun © 2024 copyright all rights reserved.</h4>
            </div>
        </div>
    );
};