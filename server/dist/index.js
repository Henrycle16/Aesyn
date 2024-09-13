"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongodb_connection_1 = require("./db/mongodb-connection");
const pineconedb_connection_1 = require("./db/pineconedb-connection");
// import { tokenRefresh } from "./lib/instagram/tokenRefresh"; Not being used
// import { pineconeWatch } from "./services/mongodb-pineconedb";
const PORT = process.env.PORT || 5000;
// Initalizing MongoDB connection
(0, mongodb_connection_1.connectToDatabase)().then(async () => {
    app_1.default.listen(PORT, () => console.log(`Server listening on port ${PORT} & connected to MongoDB`));
})
    .catch(error => console.log(error));
// Initalizing PineconeDB connection
(0, pineconedb_connection_1.connectToPinecone)().then(() => {
    console.log("Pinecone connection successful");
}).catch(error => console.log(error));
// Initalizing watch function for PineconeDB
// pineconeWatch().then(() => {
//     console.log("Pinecone watching for changes");
// }).catch(error => console.log(error));
// Refreshing tokens
// tokenRefresh().then(() => {
//     console.log("Tokens refreshed successfully");
// }).catch(error => console.log(error));
//# sourceMappingURL=index.js.map