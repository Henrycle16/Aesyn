import { getPineconeClient } from "../db/pineconedb-connection";
import { getEmbeddings } from "./embeddings";

// Obtaining the most similar vector embeddings from user query
export async function getMatchesFromEmbeddings(embeddings: number[]) {
  try {
    const pineconeClient = await getPineconeClient();
    const pineconeIndex = await pineconeClient.index("h2jc");

    const queryResult = await pineconeIndex.query({
      topK: 2,
      vector: embeddings,
      includeValues: true,
      //includeMetadata: true,
    });

    return queryResult.matches || [];
  } catch (error) {
    console.log("Error querying embeddings.", error);
    throw error;
  }
}

// Extracting the metadata from vector embeddings
export async function getContext(query) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbeddings(queryEmbeddings);

  // Returning matches that are atleast 40% similar
  const qualifyingData = matches.filter(
    (match) => match.score && match.score > 0.4
  );

  return qualifyingData;
}
