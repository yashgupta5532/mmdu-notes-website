import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connection= async (URL)=>{
    try {
        // const URL='mongodb://localhost:27017/CollegeNotes' || process.env.URL;
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true});
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
}
export default connection;