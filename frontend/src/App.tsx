import { Outlet } from "react-router-dom"
import Header from "./components/home/Header"
import Background from "./assets/background.jpeg";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  return (
    <>
    <ToastContainer position="top-center" />
       <div className="root text-white flex flex-col h-[100vh]">
      
      <Header/>
    
    <div className="content h-full grow overflow-y-auto" style={{backgroundImage:`url(${Background})`}}>
        <Outlet  />
    </div>
    </div>
    </>
 
  )
}

export default Home
