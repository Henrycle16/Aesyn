import app from "./app";
import { connectToDatabase } from "./db/mongodb-connection";
import { pineconeTest } from "./db/pineconedb-connection";

const PORT = process.env.PORT || 5000;

// Initalizing MongoDB connection
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT} & connected to database.`));
    })
    .catch(error => console.log(error));

// Initalizing PineconeDB connection
pineconeTest().then(() => {
    console.log("Pinecone connection successful.");
}).catch(error => console.log(error));