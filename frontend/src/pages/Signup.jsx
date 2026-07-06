import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { InputBox } from "../components/InputBox";
import { Heading } from "../components/heading";
import { SubHeading } from "../components/subheading";
import { Button } from "../components/button";
import { ButtonWarning } from "../components/buttonWarning";


export const Signup = () => {


    const [firstname, setFirstname] = useState("");

    const [lastname, setLastname] = useState("");

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");


    const navigate = useNavigate();




    const handleSignup = async () => {


        try {


            const response = await axios.post(

                "http://localhost:3000/api/v1/user/signup",


                {

                    firstname,

                    lastname,

                    username,

                    email,

                    password

                }

            );



            localStorage.setItem(

                "token",

                response.data.token

            );



            navigate("/dashboard");



        } catch (error) {


            console.log(error.response.data);


            alert(
                error.response.data.msg
            );


        }


    };




    return (


        <div className="bg-white h-screen flex justify-center">


            <div className="flex flex-col justify-center">


                <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">


                    <Heading label={"Sign up"} />


                    <SubHeading
                        label={
                            "Enter your information to create an account"
                        }
                    />



                    <InputBox

                        label={"First Name"}

                        placeholder={"John"}

                        onChange={(e)=>

                            setFirstname(
                                e.target.value
                            )

                        }

                    />




                    <InputBox

                        label={"Last Name"}

                        placeholder={"Doe"}

                        onChange={(e)=>

                            setLastname(
                                e.target.value
                            )

                        }

                    />




                    <InputBox

                        label={"User Name"}

                        placeholder={"john123"}

                        onChange={(e)=>

                            setUsername(
                                e.target.value
                            )

                        }

                    />




                    <InputBox

                        label={"Email"}

                        placeholder={"john@gmail.com"}

                        onChange={(e)=>

                            setEmail(
                                e.target.value
                            )

                        }

                    />





                    <InputBox

                        label={"Password"}

                        placeholder={"123456"}

                        onChange={(e)=>

                            setPassword(
                                e.target.value
                            )

                        }

                    />





                    <div className="pt-4">


                        <Button

                            label={"Sign up"}

                            onClick={handleSignup}

                        />


                    </div>




                    <ButtonWarning

                        label={"Already have an account?"}

                        buttonText={"Sign in"}

                        to={"/signin"}

                    />



                </div>


            </div>


        </div>

    );


};