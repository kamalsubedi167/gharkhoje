import { Input } from "../ui/input";
import house from "../../assets/house.jpeg";
import ListProperty from "../property/ListProperty";
import { useState } from "react";
import { userStore } from "@/store/userStore";

function Home() {

    const [isFocused,setFocused] = useState(false);
    console.log("redsdf")
  return (
    <div className=" h-full">
      <div className="main w-full h-full  flex">
        <div className="col1 p-[10%]   w-1/2">
          <h1 className="text-4xl font-bold">Display</h1>
          <h1 className="text-4xl font-bold">Most Suitable</h1>
          <h1 className="text-4xl font-bold">Property</h1>

          <p className="mt-[5%] text-xs text-gray-400">
            Find the best property in this world using our website and and we
            are good in hjejre tooa
          </p>

          <Input onClick={()=>{setFocused(true)}}
            className="mt-[20%] bg-white text-black"
            placeholder="Search property"
          />
        </div>

        <div className="col2 p-[10%]   w-1/2">
          <div
            className="imgcontainer w-[350px] border-gray-500 border-4 z-50 overflow-hidden"
            style={{ borderRadius: "15rem 15rem 0 0" }}
          >
            <img className="w-full" src={house} />
          </div>
        </div>
      </div>

      <ListProperty isFocused={isFocused}/>

   
    </div>
  );
}

export default Home;
