import { connect, disconnect } from 'mongoose';

// Connect - mongo db
async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL)
    } catch(error){
        console.log(error);
        throw new Error("Connection to MongoDB failed");
    }
}

// Disconnect - mongo db
async function disconnectFromDatabase(){
    try{
        await disconnect();
    } catch(error){
        console.log(error);
        throw new Error("Disconnection from MongoDB failed");
    }
}

export {connectToDatabase, disconnectFromDatabase};