"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPineconeClient = exports.connectToPinecone = void 0;
const pinecone_1 = require("@pinecone-database/pinecone");
// Initalize Pinecone client
const getPineconeClient = () => {
    return new pinecone_1.Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });
};
exports.getPineconeClient = getPineconeClient;
async function connectToPinecone() {
    const pineconeClient = await getPineconeClient();
    // Setting client to use h2jc index
    const pineconeIndex = await pineconeClient.index("h2jc");
}
exports.connectToPinecone = connectToPinecone;
//# sourceMappingURL=pineconedb-connection.js.map