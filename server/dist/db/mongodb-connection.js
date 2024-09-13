"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectFromDatabase = exports.connectToDatabase = void 0;
const mongoose_1 = require("mongoose");
// Connect to MongoDB
async function connectToDatabase() {
    try {
        await (0, mongoose_1.connect)(process.env.MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Connection to MongoDB failed");
    }
}
exports.connectToDatabase = connectToDatabase;
// Disconnect from MongoDB
async function disconnectFromDatabase() {
    try {
        await (0, mongoose_1.disconnect)();
    }
    catch (error) {
        console.log(error);
        throw new Error("Disconnection from MongoDB failed");
    }
}
exports.disconnectFromDatabase = disconnectFromDatabase;
//# sourceMappingURL=mongodb-connection.js.map