import React from "react"
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Appbar=()=>{

    const navigate=useNavigate();
    const location=useLocation();

    return<div className="shadow h-16 flex justify-between">
        <div className="flex items-center space-x-3 text-xl font-bold text-gray-800">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-map text-blue-600"
  >
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" x2="9" y1="3" y2="18" />
    <line x1="15" x2="15" y1="6" y2="21" />
  </svg>
  <span className="text-xl tracking-tight">Namma-Road</span>
</div>

        <div className="flex">

        <div className={`flex flex-col justify-center h-10 mt-3 mr-4 hover:bg-blue-50 hover:text-blue-500 px-2 py-1 rounded-md ${
              location.pathname === "/"
                ? "bg-blue-500 text-white"
                : "focus:outline-none text-black"
            }`}>
                <button onClick={(e)=>{
                    navigate("/");
                }}>Home</button>
            </div>
       
        <div className={`flex flex-col justify-center h-10 mt-3 mr-4 hover:bg-blue-50 hover:text-blue-500 px-2 py-1 rounded-md ${
              location.pathname === "/report"
                ? "bg-blue-500 text-white"
                : "focus:outline-none text-black"
            }`}>
                <button className="focus:outline-none" onClick={(e)=>{
                    navigate("/report");
                }}>Report</button>
            </div>

            <div className={`flex flex-col justify-center h-10 mt-3 mr-4  hover:bg-blue-50 hover:text-blue-500 px-2 py-1 rounded-md ${
              location.pathname === "/leaderboard"
                ? "bg-blue-500 text-white"
                : "focus:outline-none text-black"
            }`}>
                <button onClick={(e)=>{
                    navigate("/leaderboard");
                }}>leaderboard</button>
            </div>
         
            <div className={`flex flex-col justify-center h-10 mt-3 mr-4  hover:bg-blue-50 hover:text-blue-500 px-2 py-1 rounded-md ${
              location.pathname === "/dashboard"
                ? "bg-blue-500 text-white"
                : "focus:outline-none text-black"
            }`}>
                <button onClick={(e)=>{
                    navigate("/dashboard");
                }}>Dashboard</button>
            </div>

            <div className={`flex flex-col justify-center h-10 mt-3 mr-4 hover:bg-blue-50 hover:text-blue-500 px-2 py-1 rounded-md ${
              location.pathname === "/admin"
                ? "bg-blue-500 text-white"
                : "focus:outline-none text-black"
            }`}>
                <button onClick={(e)=>{
                    navigate("/admin");
                }}>Admin</button>
            </div>

            <div className={`flex flex-col justify-center h-10 mt-3 mr-4  focus:outline-none hover:bg-blue-50 hover:text-blue-500 px-2 py-1 rounded-md ${
              location.pathname === "/signup"
                ? "bg-blue-500 text-white"
                : "focus:outline-none text-black"
            }`}>
                <button onClick={(e)=>{
                    navigate("/signup");
                }}>Sign-up</button>
            </div>
            {/* <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    User
                </div>
            </div> */}
        </div>
    </div>
    
}