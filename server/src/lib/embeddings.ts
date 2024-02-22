import { OpenAIApi, Configuration } from "openai-edge";
import { OpenAIEmbeddings } from "@langchain/openai";

// Configuring openai embedding api
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

// Convert text to embeddings
export async function getEmbeddings(text: string) {
  try {
    const embeddingsModel = new OpenAIEmbeddings();
    const embedding = await embeddingsModel.embedQuery(text);
    
    return embedding;
  } catch (error) {
    console.log("Error calling OpenAI embeddings api.", error);
    throw error;
  }
}
