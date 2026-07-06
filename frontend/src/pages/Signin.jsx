import { ButtonWarning } from "../components/buttonWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/subheading";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";


export const Signin = () => {


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const navigate = useNavigate();




    const handleSignin = async () => {


        try {


            const response = await axios.post(

                "http://localhost:3000/api/v1/user/signin",

                {

                    email,

                    password

                }

            );





            const token = response.data.token;



            localStorage.setItem(

                "token",

                token

            );






            // get logged in user details

            const me = await axios.get(


                "http://localhost:3000/api/v1/user/me",


                {

                    headers:{


                        Authorization:
                        "Bearer " + token


                    }


                }


            );








            if(me.data.role === "admin"){


                navigate("/admin");


            }


            else{


                navigate("/dashboard");


            }








        } catch(error){



            console.log(error.response?.data);



            alert(

                error.response?.data?.msg ||
                "Login failed"

            );



        }


    };









    return (


        <div className="bg-white h-screen flex justify-center">


            <div className="flex flex-col justify-center">



                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">



                    <Heading 
                        label={"Sign in"} 
                    />




                    <SubHeading

                        label={
                            "Enter your credentials to access your account"
                        }

                    />






                    <InputBox


                        label={"Email"}

                        placeholder="xyz@gmail.com"


                        onChange={(e)=>{


                            setEmail(
                                e.target.value
                            );


                        }}


                    />








                    <InputBox


                        label={"Password"}

                        placeholder="123456"


                        onChange={(e)=>{


                            setPassword(
                                e.target.value
                            );


                        }}


                    />








                    <div className="pt-4">



                        <Button

                            label={"Sign in"}

                            onClick={handleSignin}

                        />



                    </div>









                    <ButtonWarning


                        label={
                            "Don't have an account?"
                        }


                        buttonText={
                            "Sign up"
                        }


                        to={"/signup"}


                    />




                </div>



            </div>



        </div>


    );

};