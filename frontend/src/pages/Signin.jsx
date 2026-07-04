import { ButtonWarning } from "../components/buttonWarning";
import { Button } from "../components/button";
import { Heading } from "../components/heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/subheading";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import axios from "axios"


export const Signin = () => {

    const[email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    return <div> 
  
    <div className="bg-white-500 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e)=>{
            setEmail(e.target.value);
        }} placeholder="xyz@gmail.com" label={"Email"} />

        <InputBox onChange={(e)=>{
            setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button 
            onClick={async () => {
              try {
                const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                  email,
                  password
                });
              
                localStorage.setItem("token", response.data.token);
              
                // Fetch user data to know if admin
                const me = await axios.get("http://localhost:3000/api/v1/user/me", {
                  headers: {
                    Authorization: `Bearer ${response.data.token}`
                  }
                });
              
                if (me.data.role === "admin") {
                  navigate("/admin");
                } else {
                  navigate("/dashboard");
                }
              
              } catch (err) {
                alert("Invalid login");
              }
            }} 
            label={"Sign in"} />

        </div>
        <ButtonWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
</div> 
}