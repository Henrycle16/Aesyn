import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import Users from '../models/userModel';

// Initalize Pinecone client
const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
};

async function pineconeTest() {
  const pineconeClient = await getPineconeClient();

  // Setting client to use h2jc index
  const pineconeIndex = await pineconeClient.index("h2jc");
}

export { pineconeTest, getPineconeClient };