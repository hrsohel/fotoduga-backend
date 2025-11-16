"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fotoduga'; // Replace with your MongoDB URI
mongoose_1.default.connect(MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    App_1.default.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
});
//# sourceMappingURL=server.js.map