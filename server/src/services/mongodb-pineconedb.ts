import Users from '../models/User';
import { getPineconeClient } from "../db/pineconedb-connection";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeRecord, RecordMetadata, RecordValues } from '@pinecone-database/pinecone';

async function pineconeWatch() {
  Users.watch().on('change', async (data) => {
    // Initalize OpenAIEmbeddings model
    const embeddingsModel = new OpenAIEmbeddings();

    // Setting Pinecone client to use h2jc index
    const pineconeClient = await getPineconeClient();
    const pineconeIndex = await pineconeClient.index("h2jc");

    // If a new document is inserted into the collection, replicate its vector in Pinecone
    if (data.operationType === 'insert') {
        let document = data.fullDocument;
        let description = document.description;
        
        const docId = document._id;

        if (!Array.isArray(document)) {
            document = [document];
        }

        const embeddings = await embeddingsModel.embedQuery(description);

        const records = [{
          id: `${docId}`,
          values: embeddings,
        }];
        
        await pineconeIndex.upsert(records);

        console.log("Pinecone updated with new vector.");
    }
  });
}

export { pineconeWatch };