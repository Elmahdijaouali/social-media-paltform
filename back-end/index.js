import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import postRoute from './routes/postRoute.js';
import userRoute from './routes/userRoute.js';
import friendRoute from './routes/friendRoute.js'

import cors from 'cors' ;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app); 

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true
    }
    }
 );



app.use(express.json()); 
app.use('/uploads', express.static('uploads'));

app.use((req , res , next ) => {
  req.io = io;
  next()
  
})

app.use(cors());
const prefex = '/api/v1'
mongoose.connect(
   process.env.MONGO_DB || 'mongodb://localhost:27017/social_media_db' 
   )
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));



io.on("connection" , (socket) => {
  console.log("a user connected");

  socket.on("register", (userId) => {
    socket.join(userId); 
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} joined their private room`);
  });

  socket.on("disconnect" , () =>{
      console.log("a user disconnected");
      for (const [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  }
    
  
  );
 
} )
  
// Routes
app.use( prefex + '/posts', postRoute);
app.use( prefex + '/auth', userRoute )
app.use( prefex + '/friends', friendRoute )


