import React, { useContext } from 'react'
import { SideBarContext } from '../sidebar/Sidebar'
import Sidebar from "./Sidebar";

export default function History() {

    const { isSidebarOpen } = useContext(SideBarContext);

    return (
        <div className={isSidebarOpen ? 'History' : undefined}>
            <div>
                {isSidebarOpen && <Sidebar />}
            </div>
            <div>
                <h1>History</h1>
            </div>
        </div>
    )
};