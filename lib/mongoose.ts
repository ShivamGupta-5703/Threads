import mongoose from 'mongoose';

let isConnected = false; // to check if mongoose is connected

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGO_URL) return console.log('MONGODB_URL not found');
    
    // If the connection is already established, return without creating a new connection.
    if(isConnected) return console.log('Already connected to MongoDB');

    try{
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true; // Set the connection status to true
        console.log("MonogoDb connected");
    }catch(error){
        console.log(error);
    }
}

