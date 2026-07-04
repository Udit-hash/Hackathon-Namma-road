import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface User {

    firstname: string;

    lastname: string;

    username: string;

    email: string;

    role: string;

}

export const Appbar = () => {


    const navigate = useNavigate();
    const location = useLocation();


    const [user, setUser] =
        useState<User | null>(null);
    const [open, setOpen] = useState(false);



    useEffect(() => {


        const fetchUser = async () => {

    const token = localStorage.getItem("token");

    console.log("APPBAR TOKEN:", token);


    if (!token) {
        return;
    }


    try {

        const res = await axios.get(
            "http://localhost:3000/api/v1/user/me",
            {
                headers:{
                    Authorization:"Bearer "+token
                }
            }
        );


        console.log("APPBAR USER:", res.data);


        setUser(res.data);


    } catch(error){

        console.log("APPBAR ERROR:", error);

    }

};fetchUser();


    }, [location.pathname]);





    const logout = () => {


        localStorage.clear();


        setUser(null);


        navigate("/signin");


    };







    const navClass = (path:string) =>

        `flex flex-col justify-center h-10 mt-3 mr-4 
        hover:bg-blue-50 hover:text-blue-500 
        px-2 py-1 rounded-md
        ${
            location.pathname === path
            ? "bg-blue-500 text-white"
            : "text-black"
        }`;








    return (


        <div className="shadow h-16 flex justify-between">


            {/* LOGO */}


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




                <span>

                    Namma-Road

                </span>


            </div>







            {/* NAVBAR */}


            <div className="flex items-center">



                <div className={navClass("/")}>


                    <button
                    onClick={() => navigate("/")}
                    >

                        Home

                    </button>


                </div>







                <div className={navClass("/report")}>


                    <button
                    onClick={() => navigate("/report")}
                    >

                        Report

                    </button>


                </div>







                <div className={navClass("/leaderboard")}>


                    <button
                    onClick={() => navigate("/leaderboard")}
                    >

                        leaderboard

                    </button>


                </div>








                <div className={navClass("/dashboard")}>


                    <button
                    onClick={() => navigate("/dashboard")}
                    >

                        Dashboard

                    </button>


                </div>








                <div className={navClass("/admin")}>


                    <button
                    onClick={() => navigate("/admin")}
                    >

                        Admin

                    </button>


                </div>








                {/* USER SECTION */}


                {

                    user ?


                    <div className="relative mr-5">



                        <button


                            onClick={() =>
                                setOpen(!open)
                            }


                            className="
                            w-11 h-11
                            rounded-full
                            bg-blue-500
                            text-white
                            font-bold
                            text-xl
                            flex
                            items-center
                            justify-center
                            "


                        >


                            {
                                user.firstname[0]
                                .toUpperCase()
                            }


                        </button>








                        {

                            open &&


                            <div className="
                            absolute
                            right-0
                            mt-3
                            w-44
                            bg-white
                            shadow-lg
                            rounded-xl
                            p-3
                            z-50
                            ">



                                <p className="font-bold">

                                    {
                                        user.firstname
                                    }

                                </p>



                                <p className="text-sm text-gray-500 border-b pb-2">


                                    {
                                        user.role
                                    }


                                </p>







                                <button


                                    onClick={logout}


                                    className="
                                    text-red-500
                                    mt-3
                                    hover:bg-red-50
                                    w-full
                                    text-left
                                    p-2
                                    rounded
                                    "


                                >


                                    Sign out


                                </button>




                            </div>

                        }




                    </div>




                    :





                    <div className={navClass("/signup")}>



                        <button
                        onClick={() => navigate("/signup")}
                        >

                            Sign-up

                        </button>



                    </div>


                }




            </div>



        </div>


    );

};