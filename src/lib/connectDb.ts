import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
};

const connection: ConnectionObject = { };

async function dbConnect(): Promise<void> {
    // If the db is already connected, skip the connection 
    if (connection.isConnected) {
        console.log("Already connected");
        return;
    }
    try {
        //connect the db
        const db =  await mongoose.connect(process.env.DB_URL!, {});
        console.log("DBURL", process.env.DB_URL);

        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully");
        
    } catch (error) {
        console.log("DB Connection failed: ", error);
        process.exit()
    }
}

export default dbConnect;