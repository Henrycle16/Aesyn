"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContext = exports.getMatchesFromEmbeddings = void 0;
const pineconedb_connection_1 = require("../../db/pineconedb-connection");
const embeddings_1 = require("./embeddings");
// Obtaining the most similar vector embeddings from user query
async function getMatchesFromEmbeddings(embeddings) {
    try {
        const pineconeClient = await (0, pineconedb_connection_1.getPineconeClient)();
        const pineconeIndex = await pineconeClient.index("h2jc");
        const queryResult = await pineconeIndex.query({
            topK: 4,
            vector: embeddings,
            includeValues: true,
            //includeMetadata: true,
        });
        return queryResult.matches || [];
    }
    catch (error) {
        console.log("Error querying embeddings.", error);
        throw error;
    }
}
exports.getMatchesFromEmbeddings = getMatchesFromEmbeddings;
// Extracting the metadata from vector embeddings
async function getContext(query) {
    const queryEmbeddings = await (0, embeddings_1.getEmbeddings)(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings);
    // Returning matches that are atleast 70% similar
    const qualifyingData = matches.filter((match) => match.score && match.score > 0.7);
    return qualifyingData;
}
exports.getContext = getContext;
//# sourceMappingURL=queryResponse.js.map