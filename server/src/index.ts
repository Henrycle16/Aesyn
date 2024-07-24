import app from "./app";
import { connectToDatabase } from "./db/mongodb-connection";
import { connectToPinecone } from "./db/pineconedb-connection";
// import { tokenRefresh } from "./lib/instagram/tokenRefresh"; Not being used
// import { pineconeWatch } from "./services/mongodb-pineconedb";

const PORT = process.env.PORT || 5000;

// Initalizing MongoDB connection
connectToDatabase().then(async () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT} & connected to MongoDB`));
    })
    .catch(error => console.log(error));

// Initalizing PineconeDB connection
connectToPinecone().then(() => {
    console.log("Pinecone connection successful");
}).catch(error => console.log(error));

// Initalizing watch function for PineconeDB
// pineconeWatch().then(() => {
//     console.log("Pinecone watching for changes");
// }).catch(error => console.log(error));

// Refreshing tokens
// tokenRefresh().then(() => {
//     console.log("Tokens refreshed successfully");
// }).catch(error => console.log(error));