import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import ViewProperty from './components/property/ViewProperty';
import Profile from './components/profile/Profile';

// import {} from 'react-router'


const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<div>Route not found</div>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/login',
                element:<Login/>
            },
            {
                path:'/register',
                element:<Register/>
            },
            {
                path:'/property/:id',
                element:<ViewProperty/>
            },
            {
                path:'/profile/:id?',
                element:<Profile/>
            },
        ]
    },
    
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)

