import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();


const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_DB_URL as string
    
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;