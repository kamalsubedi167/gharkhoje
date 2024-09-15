import { userStore } from '@/store/userStore';
import { Cat, MailOpen, PlusIcon, Search, HomeIcon, } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/file(1).png'


const Header = () => {
  const { token } = userStore();
  // alert(token)

  return (

    <header className="bg-white text-black py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link to={'/'}> <img src={logo}  size={24} className="text-gray-500 w-20 hover:text-white cursor-pointer" /> </Link>
        <Link to={'/'}>  <span className="text-xl text-indigo-700 font-bold">GharKhoje</span></Link>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center">
     
     
        
        

        {

          token == null ?
          

            <>
            
              <Link to="/login" className="mr-4 hover:text-gray-400 cursor-pointer">Login</Link>
              <Link to="/register" className="mr-4 hover:text-gray-400 cursor-pointer">Register</Link>
              
            </> :
            <>
             <Link to="/properties"  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              <HomeIcon className="inline-block w-5 h-5 mr-1" />Properties</Link>

            
              <Link to='/addproperty' className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              <PlusIcon className="inline-block w-5 h-5 mr-1" />AddProperty</Link>
            
             <Link to="/messages"  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
             <MailOpen className="inline-block w-5 h-5 mr-1" />Messages</Link>
              <Link to={'/profile'}>
                <Cat size={24} className="text-gray-500 rounded-full hover:text-white cursor-pointer" />

              </Link>

            </>
        }




      </div>
    </header>
  );
};

export default Header;