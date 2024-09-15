import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { API_HOST } from "@/configs/constants"
import { toast } from "react-toastify"
import { userStore } from "@/store/userStore"
import { LoginRequest, useLoginMutation } from "@/api/apiSlice"



function Login() {

  const [data,setData] = useState<LoginRequest>({email:"",password:""});
  const {setId,setToken} = userStore()

  const [login,{isError,isSuccess,isLoading,data:loginResponse,error}] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(()=>{

    if(isError){
      toast.error(error.data.message);
    }
    if(isSuccess){
      // alert("hello")
      setId(loginResponse.id);
      setToken(loginResponse?.token);
      navigate('/');
    }

  },[error,loginResponse,isSuccess]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="box backdrop-blur-sm bg-white p-2 py-[40px]  rounded-lg shadow-lg border  w-[40%]">
            <h1 className="text-center text-gray-700 text-2xl font-bold fosansnt-serif mb-4">Login</h1>

            <form className="w-full px-[10%] text-black flex justify-center flex-col gap-3 items-center">

                <Input value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}  className="w-full " type="text" placeholder="Enter your email"/>

                <Input value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} className="w-full " type="password" placeholder="Enter your password"/>
                <Link className="self-start text-xs text-blue-500" to="#">Forgot Password?</Link>
            
                <Button disabled={isLoading} onClick={(e)=>login({email:data.email,password:data.password})} className="" variant={'submit'}>Login</Button>


                <Link className=" text-xs text-blue-500" to="/register">Dont have account,Register here?</Link>



            </form>
      </div>
    </div>
  )
}

export default Login
