import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useEffect, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { API_HOST } from "@/configs/constants"

interface RegisterForm {
  name: string,
  email: string,
  password: string,
  c_password: string
}


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_Password] = useState('');
  const [loading,setLoading] = useState(false);


  const [errors, setErrors] = useState< Partial<RegisterForm>   >({})
  const navigate = useNavigate()


  async function submit(e: Event) {
    e.preventDefault();
    if(password != c_password){
      setErrors({...errors,c_password:"Confirm password must match"});
      return;
    }
    const data = { name, email, password }
    setLoading(true);
    
    // alert("Hello")
    try {
      const res = await axios.post(API_HOST + "/auth/register", data, {
        headers: { "Content-Type": "application/json" }
      });

      // const { message } = res.data;
      toast.success("User is registered successsfully");
      navigate('/login')


    } catch (e: any) {
      
      const res = e.response as AxiosResponse;
      const { email, password, name, message } = res.data;
      setErrors({ email, name, password })
      if(message){
        toast.error(message+"");
      }

    }

      setLoading(false);

  }


  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="box bg-white p-2 py-[40px]  rounded-lg shadow-lg border  w-[40%]">
        <h1 className="text-center text-gray-700 text-2xl font-bold fosansnt-serif mb-4">Register</h1>

        <form className="w-full text-black flex justify-center flex-col gap-5 items-center">

          <Input value={email} onChange={(e) => setEmail(e.target.value)} className="w-[80%] text-black" type="email" placeholder="Enter your email" />

         {
            errors.email && <div className="text-red-500 text-xs self-start">{errors.email}</div>
          }



          <Input value={name} onChange={(e) => setName(e.target.value)} className="w-[80%] text-black" type="text" placeholder="Enter your name" />
          {

            errors.name && <div className="text-red-500 text-xs self-start">{errors.name}</div>
          }

          <Input value={password} onChange={(e) => setPassword(e.target.value)} className="w-[80%] text-black" type="password" placeholder="Enter your password" />
          {

            errors.password && <div className="text-red-500 text-xs self-start">{errors.password}</div>
          }
          <Input value={c_password} onChange={(e) => setC_Password(e.target.value)} className="w-[80%] text-black" type="password" placeholder="Enter your confirm-password" />
          {

            errors.c_password && <div className="text-red-500 text-xs self-start">{errors.c_password}</div>
          }
          <Button disabled={loading} onClick={(e) => submit(e)} className="" variant={'submit'}>{loading ? "Submitting..." :"Register"}</Button>
          <Link className=" text-xs text-blue-500" to="/login">Already have account, Login here?</Link>



        </form>
      </div>
    </div>
  )

}

export default Register
