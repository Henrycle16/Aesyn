//! Mongoose Library
import Users from '../models/userModel';
// import pinecone
// import langchain

Users.watch().on('change', (data) => {
  // If a new document is inserted into the collection, replicate its vector in Pinecone
  if (data.operationType === 'insert') {
    const document = data.fullDocument;

    // Convert the document's name into an embedding
    const vector = model.encode(document.name);

    // Insert into Pinecone
    pinecone.insert({
      indexName: 'myindex',
      data: vector,
      ids: [String(document._id)],
    });
  }

  // If a document is updated in the collection, update its vector in Pinecone
  else if (data.operationType === 'update') {
    const documentId = data.documentKey._id;
    const updatedFields = data.updateDescription.updatedFields;

    // If the change is in the name field, generate the embedding and insert
    if (updatedFields?.name) {
      const vector = model.encode(updatedFields.name);
      pinecone.upsert({
        indexName: 'myindex',
        data: vector,
        ids: [String(documentId)],
      });
    }
  }

  // If a document is deleted from the collection, remove its vector from Pinecone
  else if (data.operationType === 'delete') {
    pinecone.delete({
      ids: [String(data.documentKey._id)],
    });
  }
});