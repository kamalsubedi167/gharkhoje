import { userStore } from '@/store/userStore';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Message } from './type';
import { useGetMessagesQuery, useSendMessageMutation } from '@/api/apiSlice';

const SOCKET_URL = 'http://localhost:3000';
const socket = io(SOCKET_URL);

const ChatBox = () => {
    const { id: user_id } = useParams();
    const { id: me_id } = userStore();

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    const [sendMessage] = useSendMessageMutation();
    const { isError: isMsgError, isLoading: isMsgLoading, data: initialMessages,refetch } = useGetMessagesQuery(user_id);

    const messageContainerRef = useRef<HTMLDivElement>(null);
    const messageTypeRef = useRef<HTMLInputElement>(null);





    useEffect(()=>{
        const interval = setInterval(()=>{
            refetch(user_id);
        },2000)

        return ()=> clearInterval(interval)
    },[])



    useEffect(() => {
        if (initialMessages) {
            setMessages(initialMessages.messages);
        }

        socket.on('chat message', (msg) => {
            console.log('Received message:', msg); // Debugging log
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, [initialMessages]);

    useEffect(() => {
        messageTypeRef.current?.focus();
    }, []);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            sendMessage({ receiver: user_id + "", text: newMessage }).then(() => {
                setNewMessage("");
            });
        }
    };

    if (isMsgLoading) return <div>Loading...</div>;
    if (isMsgError) return <div>Something went wrong fetching messages</div>;

    return (
        <div className="flex flex-col h-full bg-gray-200">
            <div className="bg-gray-300 p-4 text-black flex items-center gap-5">
                <h3>Avatar</h3>
                <h3 className="text-xl font-bold">{initialMessages?.user.name}</h3>
            </div>

            <div ref={messageContainerRef} className="w-full flex-grow overflow-y-auto p-4">
                {messages.map(message => (
                    <div
                        key={message.id}
                        className={`mb-4 flex ${message.sender === me_id ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`inline-block p-2 rounded-lg max-w-xs ${message.sender === me_id ? 'bg-blue-600 text-white' : 'bg-gray-400'}`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            <form
                onSubmit={handleSendMessage}
                className="bg-gray-300 p-2 flex items-center"
            >
                <input
                    ref={messageTypeRef}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-gray-200 p-2 rounded-l-lg focus:outline-none"
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 p-2 rounded-r-lg ml-2"
                >
                    Send
                </button>
                <label
                    htmlFor="file-upload"
                    className="ml-2 bg-blue-600 hover:bg-blue-700 p-2 rounded-lg cursor-pointer"
                >
                    Upload
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        // onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    />
                </label>
            </form>
        </div>
    );
};

export default ChatBox;
