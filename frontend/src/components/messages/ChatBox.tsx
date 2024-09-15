import React, { useEffect, useRef, useState } from 'react';
import { User, Message } from './type';
import { useLocation, useParams } from 'react-router-dom';
import { api, useGetMessagesQuery, useSendMessageMutation } from '@/api/apiSlice';
import { useStore } from 'zustand';
import io from 'socket.io-client';//socket import
import { userStore } from '@/store/userStore';

const SOCKET_URL = 'http://localhost:3000';
const socket = io(SOCKET_URL);
socket.on("connect",()=>{
    // socket.emit("message",{msg:"Hello owrld"})
    alert("Hello")
})
socket.emit("message",{msg:"Hello owrld"})

const ChatBox = () => {


    const { id: user_id }: any = useParams();
    

    const { id: me_id } = userStore();
    // alert(pathname);
    // alert(me_id);

    const [showchat, setshowchat] = useState(true)
    const toggleChat = () => setshowchat(!showchat)
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    var [newMessage, setNewMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [count, setCount] = useState(0);

    const [sendMessage, { isError, isLoading, isSuccess }] = useSendMessageMutation();
    // alert(user_id)
    const { isError: isMsgError, isLoading: isMsgLoading, isSuccess: isMsgSuccess, data: messages,refetch } = useGetMessagesQuery(user_id);

    const messageContainerRef = useRef<HTMLDivElement>(null);
    const messageTypeRef = useRef<HTMLInputElement>(null);


    useEffect(() => {//socket
        // Listen for incoming messages
        socket.on('chat message', (msg) => {
          setNewMessages((prevMessages:any) => [...prevMessages, msg]);
        });
    
        // Clean up on component unmount
        return () => {
          socket.off('chat message');
        };
      }, []);//socket


    useEffect(() => {
        messageTypeRef.current?.focus();
    }, [])

    useEffect(() => {
        if (messageContainerRef.current)
            messageContainerRef.current.scrollTop = messageContainerRef.current?.scrollHeight;
    }, [messages]);




    const handleSendMessage = () => {

        sendMessage({ receiver: user_id + "", text: newMessage });
        setNewMessage("");

    };


    if (isMsgLoading) return <div >Loading...</div>
    if (isMsgError) return <div>Something went wrong fetching messages</div>


    return (
        <div className="flex flex-col h-full bg-gray-200 ">


            {/* <div className="flex flex-col  w-full"> */}
            <>
                {/* Chat Header */}
                <div className="bg-gray-300 p-4 text-black items-center  flex gap-5">
                    <h3>Avatar</h3>
                    <h3 className="text-xl font-bold">{messages?.user.name} </h3>
                    {/* <h1 className=''>X</h1> */}
                    {/* <button onClick={toggleChat} className="text-gray-500">&times;</button> */}
                </div>

                {/* Chat Messages */}
                <div ref={messageContainerRef} className=" w-full flex-grow  overflow-y-auto p-4">
                    {messages?.messages.map(message => (

                        <div
                            key={message.id}
                            className={`mb-4 flex ${message.sender == me_id ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <div
                                className={`inline-block p-2 rounded-lg max-w-xs ${message.sender == me_id
                                    ? 'bg-blue-600 '
                                    : 'bg-gray-400'
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input and File Upload */}
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage }} className="bg-gray-300 p-2 flex items-center ">
                    <input
                        ref={messageTypeRef}

                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        // onKeyDown={handleKeyDown} // Add key event for Enter
                        className="flex-1 bg-gray-200  p-2 rounded-l-lg focus:outline-none"
                        placeholder="Type a message..."
                    />

                    <input
                        type='submit'
                        value={"Send"}
                        className="bg-blue-500 hover:bg-blue-500 p-2 rounded-r-lg ml-2"
                        onClick={handleSendMessage}
                    />

                    <label htmlFor="file-upload" className="ml-2 bg-blue-600 hover:bg-blue-700  p-2 rounded-lg cursor-pointer">
                        Upload
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                        // onChange={(e) => handleFileChange(e.target.files)}
                        />
                    </label>
                </form>
            </>

            {/* </div> */}
        </div>
    );
};

export default ChatBox;
