import { Link } from "react-router-dom";

function Footer() {

    const token = JSON.parse(localStorage.getItem("accessToken"));
    const firstName = localStorage.getItem("firstName");

    return (
        <>
            {/* Creating footer for small screens */}
            <div className="flex justify-evenly border-t border-b border-black mt-44 lg+:hidden">
                <div className="mt-5 mb-5 border-r pr-14 sm:pr-32 md:pr-52 border-black text-2xl">
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                </div>
                <div className="mt-5 mb-5">
                    {!token ?
                        <Link to="/login">
                            <button className="border border-black px-3 py-2 rounded-md ">
                                Login
                            </button>
                        </Link> :
                        <Link to="/myaccount">
                            <button className='border border-black rounded-full p-2 px-4 '>
                                {firstName.charAt(0)}
                            </button>
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}

export default Footer;