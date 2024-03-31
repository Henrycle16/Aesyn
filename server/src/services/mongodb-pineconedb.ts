// import Users from '../models/User';
// import { getPineconeClient } from "../db/pineconedb-connection";
// import { getEmbeddings } from '../lib/embeddings';

// async function pineconeWatch() {
//   Users.watch().on('change', async (data) => {
//     // Setting Pinecone client to use h2jc index
//     const pineconeClient = await getPineconeClient();
//     const pineconeIndex = await pineconeClient.index("h2jc");

//     // If a new document is inserted into the collection, replicate its vector in Pinecone
//     if (data.operationType === 'insert') {
//         let documentId = data.documentKey._id;
//         let description = data.fullDocument.description;
        
//         const queryEmbeddings = await getEmbeddings(description);

//         const records = [{
//           id: `${documentId}`,
//           values: queryEmbeddings,
//         }];
        
//         await pineconeIndex.upsert(records);

//         console.log("Pinecone updated with new vector.");
//     } 
//     // Check if the update is in the description field, if so, update the corresponding vector in Pinecone
//     else if (data.operationType === 'update' && data.updateDescription.updatedFields.description) {
//       const documentId = data.documentKey._id;

//       const queryEmbeddings = await getEmbeddings(data.updateDescription.updatedFields.description);

//       const records = [{
//         id: `${documentId}`,
//         values: queryEmbeddings,
//       }];

//       await pineconeIndex.upsert(records);

//       console.log("Existing Pinecone vector updated.");
      
//     } 
//     // Delete the corresponding vector from Pinecone
//     else if (data.operationType === 'delete') {
//       const documentId = data.documentKey._id;

//       await pineconeIndex.deleteOne(`${documentId}`);

//       console.log("Pinecone vector deleted.");
//     }
//   });
// }

// export { pineconeWatch };