import { API_HOST } from "@/configs/constants";
import { userStore } from "@/store/userStore";
import axios, { Axios, AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


const Profile = () => {

    const [data, setData] = useState({ name: "Hari", email: "Kaml" });
    const {token} = userStore();
    const {id} = useParams();
    const [loading,setLoading] = useState(true);


    async function getuser(){
        // setLoading(true);
        try{
            const res = await axios.get(API_HOST+"/user",{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':'Bearer '+ token
                }
            });

            const {name,email,id} = res.data;
            setData({name,email});
            
        }//try
        catch(error){
            const res:any = (error as AxiosError).response;
            const {message} = res?.data;
            toast.error(message);
        }//catch

        setLoading(false);

    }//getUser

    useEffect(()=>{
        getuser();
    },[]);

    if(loading) return (
        <div>Loading...</div>
    );

    return (
        <div className="profile">
            <div className="name">{data.name}</div>
            <div className="email">{data.email}</div>
        </div>

    )

}//

export default Profile;