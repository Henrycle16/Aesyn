"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = void 0;
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const output_parsers_1 = require("@langchain/core/output_parsers");
// Generate a response from the chat model
async function getResponse(query, context) {
    try {
        const chatModel = new openai_1.ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
        });
        // TODO: Better define the prompt to provide only neccessary information
        const prompt = prompts_1.ChatPromptTemplate.fromMessages([
            ["system",
                `As a marketer for an elite company, you're responsible for choosing creators for a new marketing campaign. 
            Please provide a well-structured response that outlines the top two creators based on the given query and the provided options. 
            You may format your response in a clear and organized manner, using a numbered list to separate your choices.`
            ],
            ["user", "{input}"],
            ["user", "{content}"],
        ]);
        // Create a pipeline to process the input and parse the output
        const outputParser = new output_parsers_1.StringOutputParser();
        const llmChain = prompt.pipe(chatModel).pipe(outputParser);
        console.log(await llmChain.invoke({
            input: query,
            content: context,
        }));
    }
    catch (error) {
        console.log("Error creating chat model", error);
        throw error;
    }
}
exports.getResponse = getResponse;
//# sourceMappingURL=chatModel.js.map