import { SideBarContext } from "../sidebar/Sidebar";
import { useContext } from "react";
import Sidebar from "./Sidebar";
import Channel from "./Channel";
import { Link } from "react-router-dom";

function MyAccount() {
    const { isSidebarOpen } = useContext(SideBarContext);
    const Token = JSON.parse(localStorage.getItem("accessToken"));

    return (
        <div className={isSidebarOpen ? "flex" : undefined}>
            <div className="mr-72">
                {isSidebarOpen && <Sidebar />}
            </div>
            {Token ?
                <div className="text-center">
                    <Channel />
                    <Link to="/createchannel">
                        <button className="lg:fixed lg:-bottom-9 right-1 border border-black px-3 py-2 mb-10 mt-10 rounded-md text-xl bg-sky-700 text-white">Create Channel</button>
                    </Link>
                </div> :
                <div className="text-center mt-40 font-semibold text-2xl">
                    <h1>Access Denide !</h1>
                    <p>Login to access your account</p>
                </div>
            }
        </div>
    )
}

export default MyAccount;