import app from "./app";
import { connectToDatabase } from "./db/mongodb-connection";
import { pineconeTest, getPineconeClient } from "./db/pineconedb-connection";
import { chatModelTest } from "./lib/embeddings";
import Users from './models/userModel';
import { OpenAIEmbeddings } from "@langchain/openai";

const PORT = process.env.PORT || 5000;

// Initalizing MongoDB connection
connectToDatabase().then(async () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT} & connected to database.`));
    })
    .catch(error => console.log(error));

// Initalizing PineconeDB connection
// pineconeTest().then(() => {
//     console.log("Pinecone connection successful.");
// }).catch(error => console.log(error));

// Initalizing Chat model connection
// chatModelTest().then(() => {
//     console.log("Chat model connection successful.");
// }).catch(error => console.log(error));

Users.watch().on('change', async (data) => {
    const embeddingsModel = new OpenAIEmbeddings();
    const pineconeClient = await getPineconeClient();
    const pineconeIndex = await pineconeClient.index("h2jc");

    // If a new document is inserted into the collection, replicate its vector in Pinecone
    if (data.operationType === 'insert') {
        let document = data.fullDocument;
        let docId = document._id;

        if (!Array.isArray(document)) {
            document = [document];
        }

        document = document.map(t => String(t));

        const embeddings = await embeddingsModel.embedDocuments(document);

        const records = embeddings.map((embedding) => ({
            id: `${docId}`,
            values: embedding,
        }));
        
        await pineconeIndex.upsert(records);
    }
  });