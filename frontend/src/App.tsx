import { Outlet } from "react-router-dom"
import Header from "./components/home/Header"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  return (
    <>
    <ToastContainer position="top-center" />
       <div className="root text-black flex text-gray-1111 flex-col h-[100vh]">
      
      <Header/>
    
    <div className="content h-full text-black grow overflow-y-auto bg-gray-50" >
        <Outlet  />
    </div>
    </div>
    </>
 
  )
}

export default Home
