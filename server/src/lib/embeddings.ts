import { OpenAIEmbeddings } from "@langchain/openai";

// Convert text to embeddings
export async function getEmbeddings(text: string) {
  try {

    // Initalize OpenAIEmbeddings model
    const embeddingsModel = new OpenAIEmbeddings();
    const embedding = await embeddingsModel.embedQuery(text);
    
    return embedding;
  } catch (error) {
    console.log("Error calling OpenAI embeddings api.", error);
    throw error;
  }
}
