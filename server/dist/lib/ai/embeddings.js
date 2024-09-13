"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbeddings = void 0;
const openai_1 = require("@langchain/openai");
// Convert text to embeddings
async function getEmbeddings(text) {
    try {
        // Initalize OpenAIEmbeddings model
        const embeddingsModel = new openai_1.OpenAIEmbeddings();
        const embedding = await embeddingsModel.embedQuery(text);
        return embedding;
    }
    catch (error) {
        console.log("Error calling OpenAI embeddings api.", error);
        throw error;
    }
}
exports.getEmbeddings = getEmbeddings;
//# sourceMappingURL=embeddings.js.map