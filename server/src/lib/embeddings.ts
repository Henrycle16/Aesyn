import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Initalize chatModel client
const getChatModel = () => {
    return new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
    });
};

async function chatModelTest(){
    const chatModelClient = await getChatModel();

    const outputParser = new StringOutputParser();

    const prompt = ChatPromptTemplate.fromMessages([
        ["system", "You are a world class technical documentation writer."],
        ["user", "{input}"],
    ]);

    const chain = prompt.pipe(chatModelClient);

    const llmChain = prompt.pipe(chatModelClient).pipe(outputParser);

    console.log(await llmChain.invoke({
        input: "who is Donald Trump?",
    }));
}

export { chatModelTest };