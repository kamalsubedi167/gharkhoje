import React from 'react'
import UserArea from './UserArea'
import { Outlet, useLocation } from 'react-router-dom'

function ChatApp() {
  const { pathname } = useLocation();
  const isMessageShow = pathname != "/messages"


  return (
    <div className='flex h-full  gap-5 m-1 p-2'>

      <div className={"left h-full w-full lg:w-[30%] lg:block border "+ (isMessageShow &&'hidden ')}>
        <UserArea />
      </div>

      <div className={"right text-black flex-grow lg:block border " +(!isMessageShow && 'hidden')}>
        {
          isMessageShow ? <Outlet />: <div className='flex items-center h-full justify-center text-3xl bg-gray-300'>Start Conversation</div>
        } 
      </div>
    </div>
  )
}

export default ChatApp