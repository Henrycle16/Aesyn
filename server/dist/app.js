"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const queriesRoute_1 = __importDefault(require("./routes/queriesRoute"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const creatorRoute_1 = __importDefault(require("./routes/creatorRoute"));
const instagramRoute_1 = __importDefault(require("./routes/instagramRoute"));
const brandRoute_1 = __importDefault(require("./routes/brandRoute"));
const waitlistRoute_1 = __importDefault(require("./routes/waitlistRoute"));
const s3Route_1 = __importDefault(require("./routes/s3Route"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
// Initalizing express server
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Define routes
app.use('/api/auth', authRoute_1.default);
app.use('/api/users', userRoute_1.default);
app.use('/api/creators', creatorRoute_1.default);
app.use('/api/brands', brandRoute_1.default);
app.use('/api/query', queriesRoute_1.default);
app.use('/api/instagram', instagramRoute_1.default);
app.use('/api/s3', s3Route_1.default);
app.use('/api/waitlist', waitlistRoute_1.default);
console.log("App is running");
exports.default = app;
//# sourceMappingURL=app.js.map