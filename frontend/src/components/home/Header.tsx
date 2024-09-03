import { userStore } from '@/store/userStore';
import { Cat } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { token } = userStore();

  return (

    <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link to={'/'}><Cat size={24} className="text-gray-500 hover:text-white cursor-pointer" /> </Link>
        <Link to={'/'}>  <span className="text-xl font-bold">GharKhoje</span></Link>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center">
        <Link to="/properties" className="mr-4 hover:text-gray-400 cursor-pointer">Properties</Link>

        {

          !token ?

            <>
              <Link to="/login" className="mr-4 hover:text-gray-400 cursor-pointer">Login</Link>
              <Link to="/register" className="mr-4 hover:text-gray-400 cursor-pointer">Register</Link>
            </> :
            <>
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