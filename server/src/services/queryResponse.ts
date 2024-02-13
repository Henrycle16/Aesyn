import { getPineconeClient } from "../db/pineconedb-connection";

async function queryResponse(){
    const pineconeClient = await getPineconeClient();
    const pineconeIndex = await pineconeClient.index("h2jc");
    
    // TODO: - Obtain user query through ID
    //       - Convert user query to vector
    //       - Query PineconeDB with user vector
    //       - Obtain response from PineconeDB (this will include an ID once schema is made)
    //       - Use ID to track data from MongoDB

    const response = await pineconeIndex.query({
        // User vector goes here
        vector: [],
        topK: 3,
        includeValues: true,
    });
}

export { queryResponse };