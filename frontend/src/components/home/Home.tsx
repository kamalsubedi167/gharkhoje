import { Input } from "../ui/input";
import house from "../../assets/house.jpeg";
import ListProperty from "../property/ListProperty";
import { useState } from "react";
import { userStore } from "@/store/userStore";
import { Search, HomeIcon, PlusIcon,MailOpen } from 'lucide-react';


function Home() {

    const [isFocused,setFocused] = useState(false);
    console.log("redsdf")
  return (
    <div className=" h-ful bg-gray-100 text-gray-900">
      <div className="main w-full h-full  flex">
        <div className="col1 p-[10%]   w-1/2">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Find Your</span>{' '}
                  <span className="block  text-indigo-600 xl:inline">Perfect Home</span>
                </h1>

                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover the best properties in the world with GharKhoje. We're experts in helping you find your ideal home.
                </p>
                

          <Input onClick={()=>{setFocused(true)}}
            className="mt-[20%] bg-white text-black"
            placeholder="Search property"
          />
          
        </div>

        <div className="col2 p-[10%]  w-1/2">
          <div
            className="imgcontainer w-[120%] border-gray-100 border-4 z-50 overflow-hidden"
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
