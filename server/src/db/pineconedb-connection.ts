import { Pinecone } from "@pinecone-database/pinecone";

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

  // Test - upsert vectors to namespace
  await pineconeIndex.namespace("test-1").upsert(mockVectors);

  // Check index vector count to upsert vector count
  const stats = await pineconeIndex.describeIndexStats();

  // Test - query response on namespace
  const queryResponse = await pineconeIndex.namespace("test-1").query({
    topK: 2,
    vector: new Array(1536).fill(0.3),
    includeValues: true,
  });

  console.log("Test response - stats:");
  console.log(stats);

  console.log("Test response - query:");
  console.log(queryResponse);
}

// Mock vector dimensions to match the index dimension (1536)
const mockVectors = [
  {
    id: "vec1",
    values: new Array(1536).fill(0.1),
  },
  {
    id: "vec2",
    values: new Array(1536).fill(0.2),
  },
  {
    id: "vec3",
    values: new Array(1536).fill(0.3),
  },
  {
    id: "vec4",
    values: new Array(1536).fill(0.4),
  },
];

export { pineconeTest, getPineconeClient };