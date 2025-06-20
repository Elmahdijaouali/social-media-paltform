import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import postRoute from './routes/postRoute.js';
import userRoute from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); 
app.use('/uploads', express.static('uploads'));

const prefex = '/api/v1'
mongoose.connect(
  process.env.MONGO_URL || 'mongodb://localhost:27017/social_media_db' 
    , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

// Routes
app.use( prefex + '/posts', postRoute);
app.use( prefex + '/auth', userRoute )


