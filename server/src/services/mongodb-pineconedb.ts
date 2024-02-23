import Users from '../models/User';
import { getPineconeClient } from "../db/pineconedb-connection";
import { getEmbeddings } from '../lib/embeddings';

async function pineconeWatch() {
  Users.watch().on('change', async (data) => {
    // Setting Pinecone client to use h2jc index
    const pineconeClient = await getPineconeClient();
    const pineconeIndex = await pineconeClient.index("h2jc");

    // If a new document is inserted into the collection, replicate its vector in Pinecone
    if (data.operationType === 'insert') {
        let document = data.fullDocument;
        let description = document.description;
        
        const docId = document._id;

        const queryEmbeddings = await getEmbeddings(description);

        const records = [{
          id: `${docId}`,
          values: queryEmbeddings,
        }];
        
        await pineconeIndex.upsert(records);

        console.log("Pinecone updated with new vector.");
    }
  });
}

export { pineconeWatch };