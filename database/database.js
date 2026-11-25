import mongoose from 'mongoose';
import { DATABASE_URI } from './config/config.js';
import Notification from './models/Notification.js';

export async function connectDB(){
    try{
        await mongoose.connect(DATABASE_URI)
        // Elimina el índice único viejo de uid (ahora un uid tiene muchos registros).
        await Notification.syncIndexes()
        console.log('Connected to database');
    } catch (error) {
        console.log(error);
    }
}
