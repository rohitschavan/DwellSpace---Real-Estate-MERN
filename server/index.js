import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { DATABASE } from './config.js';
import authRoutes from './routes/auth.js'
import adRoutes from './routes/ad.js'
const app = express();

mongoose.connect(DATABASE).then(() => { console.log('Mongo DB Connected') }).catch((err) => {
    console.log('Connection refused')
})

app.use(express.json({limit:"10mb"}));
app.use(morgan('dev'));
app.use(cors());
 // Handle preflight requests

//routes middleware

app.use('/api',authRoutes);
app.use('/api',adRoutes);

app.listen(8000, (err) => {
    if (err) {
        console.log('Cannot start the server')
    } else {
        console.log('Server is started')
    }
})