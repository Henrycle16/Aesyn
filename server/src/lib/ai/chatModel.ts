import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Generate a response from the chat model
export async function getResponse(query, context) {
    try {
        const chatModel = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
        });
        
        // TODO: Better define the prompt to provide only neccessary information
        const prompt = ChatPromptTemplate.fromMessages([
            ["system", 
            `As a marketer for an elite company, you're responsible for choosing creators for a new marketing campaign. 
            Please provide a well-structured response that outlines the top two creators based on the given query and the provided options. 
            You may format your response in a clear and organized manner, using a numbered list to separate your choices.`
            ],
            ["user", "{input}"],
            ["user", "{content}"],
        ]);
        
        // Create a pipeline to process the input and parse the output
        const outputParser = new StringOutputParser();
        const llmChain = prompt.pipe(chatModel).pipe(outputParser);
 
        console.log(await llmChain.invoke({
            input: query,
            content: context,
        }));
    } catch (error) {
      console.log("Error creating chat model", error);
      throw error;
    }
  }