import express from 'express';
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { fileURLToPath } from 'url';
import routes from './src/routes/routes.js';
import path from 'path';
import upload from './src/helpers/upload.js'
import { createListing } from './src/controllers/listingController.js';
import multer from 'multer';
import http from 'http';
import { Server as SocketIoServer } from 'socket.io';


dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(express.static("public"));




//Socket is handelled here



const server = http.createServer(app);
const io = new SocketIoServer(server,{
  cors: {
    origin: 'http://localhost:5173', // Replace with your client URL
    methods: ["*"],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});


let clients = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  io.emit("connects","Hello world")
  socket.on('message', (msg) => {
      console.log('Message received:', msg);
      io.emit('chat message', msg); // Emit message to all clients
  });

  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

  //socket is complete

app.use("/api", routes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//changed for file upload VVV

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// io.listen(port,)

server.listen(port, () => {
    console.log("Server is listening on port http://localhost:" + port);
})




