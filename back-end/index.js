import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import postRoute from './routes/postRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 

mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

// Routes
app.use('/posts', postRoute);

