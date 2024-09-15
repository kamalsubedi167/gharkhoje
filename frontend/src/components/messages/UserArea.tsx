import React, { useState } from 'react';
import { User, Message } from './type';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetConversationQuery } from '@/api/apiSlice';
const UserArea = () => {




    const {isError,isLoading,isSuccess,data:users=[]} = useGetConversationQuery();


    const navigate = useNavigate();
    const [showchat, setshowchat] = useState(true)
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const {id:opened_user}:any = useParams();

    const toggleChat = () => setshowchat(!showchat)

    const handleUserClick = (user: User) => {
        toggleChat
        setSelectedUser(user);
        // In a real app, you'd fetch messages for this user here
        setMessages([
            { id: 1, senderId: user.id, text: 'Hello!', timestamp: new Date() },
            { id: 2, senderId: 'me', text: 'Hi there!', timestamp: new Date() },
        ]);
    };

    if(isLoading) return <div>Loading...</div>

    if(isError) return <div>Something went wrong fetching conversation.</div>

    return (
        <div className="flex flex-col  h-full bg-gray-200 w-full">
                <h2 className="text-xl font-bold mb-4  bg-gray-400  text-black">Chats</h2>

            {/* User List */}
            <div className="  p-4 h-full overflow-y-auto">
                {users.map(user => (
                    <div
                        key={user.id}
                        className={`flex items-center p-2 mb-2 rounded-lg cursor-pointer ${ opened_user  == user.id ? 'bg-blue-600' : 'hover:bg-blue-600'
                            }`}
                        onClick={() => navigate("/messages/"+user.id)}
                    >
                        {/* <i/mg src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" /> */}
                        <span className="text-black">{user.name}</span>
                    </div>
                ))}
            </div>
        </div>

    )
}


export default UserArea