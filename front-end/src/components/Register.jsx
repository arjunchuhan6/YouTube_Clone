import React from 'react';
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SideBarContext } from "../sidebar/Sidebar";
import Sidebar from "./Sidebar";

function Register() {

  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState();
  const [country, setCountry] = useState("");
  const { isSidebarOpen } = useContext(SideBarContext)

  //Adding show password functionality
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  let navigate = useNavigate();

  //Handle registration using post api
  async function handleRegister(e) {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:5100/registerUser", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          age: age,
          country: country
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log(data);
      alert('Registration successful');
      navigate("/login");

    }
    catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
      <div className={isSidebarOpen ? "flex" : undefined}>
        <div>
          {isSidebarOpen && <Sidebar />}
        </div>
        <div className={isSidebarOpen ? "ml-32" : undefined}>
          <h1 className="text-center text-5xl font-bold mt-10">Sign Up</h1>
          <div className="mt-10 text-center">
            <form>
              <input type="text" placeholder="First Name*" className="w-72 h-10 m-3 p-5 text-xl border-2 border-black" onChange={(e) => setFirstName(e.target.value)} required></input>
              <input type="text" placeholder="Last Name*" className="w-72 h-10 m-3 p-5 text-xl border-2 border-black" onChange={(e) => setLastName(e.target.value)} required /><br />
              <input type="email" placeholder="Email*" className="w-72 h-10 m-3 md:ml-8 p-5 text-xl border-2 border-black" onChange={(e) => setEmail(e.target.value)} required></input>
              <input type={showPassword ? "text" : "password"} minLength={8} placeholder="Password*" className="w-72 h-10 text-xl m-3 p-5 border-2 border-black" onChange={(e) => setPassword(e.target.value)} required></input>
              <button onClick={handleShowPassword} className="relative right-10 top-0.5">
                {showPassword ?
                  <img src="../../picture/hide.png" width="20px" height="20px"></img> :
                  <img src="../../picture/view.png" width="20px" height="20px"></img>
                }
              </button><br />
              <input type="number" placeholder="Age*" className="w-72 h-10 m-3 p-5 text-xl border-2 border-black" onChange={(e) => setAge(e.target.value)} required></input>
              <input type="text" placeholder="Country*" className="w-72 h-10 m-3 p-5 text-xl border-2 border-black" onChange={(e) => setCountry(e.target.value)} required></input><br />
              <button className="mt-10 mb-5 bg-black text-white border rounded-md p-2 w-24 text-center" onClick={(e) => handleRegister(e)}>Register</button>
              <p className="text-center">Already have an account?
                <Link to="/login"><b>Sign In</b> </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

  )
};

export default Register;