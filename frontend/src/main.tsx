import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import PropertyList from './components/property/MyPropertyList';
import PropertyDetail from './components/singlePage/PropertyListingPage';
import ChatApp from './components/messages/ChatApp';
import ChatBox from './components/messages/ChatBox';//imp
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { api } from './api/apiSlice';
import AddProperty from './components/AddProperty/PropertyListingForm';
import AdminPanel from './components/Admin/adminpannel';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Test from './components/messages/textbox';



const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        errorElement:<div>Route Not Found</div>,
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
                element:<PropertyDetail/>
            },
            {
                path:'/profile/:id?',
                element:<ProfilePage/>
            },
            {
                path:'/Properties',
                element:<PropertyList/>
           },
            {
                path:'/adminpannel/:id?',
                element:<AdminPanel/>
            },
            {
                path:'/addproperty/:id?',
                element:<AddProperty/>
            },
            {
                path:'/messages',
                element:<ChatApp/>,
                children:[
                    {
                        path:':id',
                        element:<Test/>
                    },
                ]
            },
           
        ]
        
    },
    
]);

createRoot(document.getElementById('root')!).render(

    <ApiProvider api={api}>
    <RouterProvider router={router}/>
    </ApiProvider>
)

