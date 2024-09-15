export interface User {
    id: number;
    name: string;
    avatar: string;
  }
  
  export interface Message {
    id: number;
    senderId: number;
    text: string;
    timestamp: Date;
  }