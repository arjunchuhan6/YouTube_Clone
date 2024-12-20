import React, { useContext, useState } from 'react';
import { SideBarContext } from '../sidebar/Sidebar';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from "./Sidebar";

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isSidebarOpen } = useContext(SideBarContext)

    function showPasswordfunction() {
        setShowPassword(!showPassword);
    }

    let navigate = useNavigate();

    //Login to page post API

    async function handleLogin(e) {
        try {
            e.preventDefault();
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);

            //accessToken and firstName in localStorage
            const expiry = Date.now() + 30 * 60000;
            const token = data.accessToken;
            localStorage.setItem("accessToken", JSON.stringify({ token, expiry }));
            localStorage.setItem("firstName", data.user.firstName);

            alert("Login successfully");

            setTimeout(() => {
                navigate("/");
                window.location.reload()
            },100);

        } catch (error) {
            console.log(error);
            alert(error.message);
        }

    }
    return (
        <div className={isSidebarOpen ? "flex" : undefined}>
            <div>
                {isSidebarOpen && <Sidebar />}
            </div>
            <div className={isSidebarOpen ? "ml-64" : undefined}>
                <h1 className="text-center text-5xl font-bold mt-10">Login</h1>
                <div className="flex justify-center mt-10">
                    <form>
                        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} className="w-80 p-2 h-10 m-4 border-b-2 border-black text-xl" required/>
                        <input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className="w-80 p-2 h-10 m-4 border-b-2 border-black text-xl" required /><br />
                        <input type="checkbox" onClick={showPasswordfunction}/>
                        <span className="ml-2">{showPassword ? "Hide Password" : "Show Password"}</span><br />
                        <button className="mt-10 mb-5 ml-32 bg-black text-white border rounded-md p-2 w-24 text-center" onClick={(e) => handleLogin(e)}>Sign In</button>
                        <p className="text-center">Don't have an account?
                            <Link to="/register"><b>Sign up</b> </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
};