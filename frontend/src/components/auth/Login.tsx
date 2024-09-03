import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { API_HOST } from "@/configs/constants"
import { toast } from "react-toastify"
import { userStore } from "@/store/userStore"

interface LoginForm{
  email:string,
  password:string
}

function Login() {

  const [data,setData] = useState<LoginForm>({email:"",password:""});
  const [loading,setLoading] = useState(false);
  const {setId,setToken} = userStore()
  const navigate = useNavigate();

  
  async function submit(e:any){
    e.preventDefault();
    setLoading(true);

    
    
    try{
        const res = await axios.post(API_HOST+"/auth/login",data,{headers:{'Content-Type':'application/json'}});
        const {token,id} = res.data;
        setToken(token);
        setId(id);
        
        toast.success("User is logined successfully");
        navigate("/");
        
      }catch(e){
      const res = (e as AxiosError).response as AxiosResponse;
      const {message} = res.data;
      toast.error(message);

    }
    setLoading(false);

  }


  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="box backdrop-blur-sm bg-white p-2 py-[40px]  rounded-lg shadow-lg border  w-[40%]">
            <h1 className="text-center text-gray-700 text-2xl font-bold fosansnt-serif mb-4">Login</h1>

            <form className="w-full px-[10%] text-black flex justify-center flex-col gap-3 items-center">

                <Input value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}  className="w-full " type="text" placeholder="Enter your email"/>

                <Input value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} className="w-full " type="password" placeholder="Enter your password"/>
                <Link className="self-start text-xs text-blue-500" to="#">Forgot Password?</Link>
            
                <Button disabled={loading} onClick={(e)=>submit(e)} className="" variant={'submit'}>Login</Button>


                <Link className=" text-xs text-blue-500" to="/register">Dont have account,Register here?</Link>



            </form>
      </div>
    </div>
  )
}

export default Login
