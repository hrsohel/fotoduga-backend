"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData.password) {
        throw new Error('Password is required');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(userData.password, 10);
    const user = new User_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    const userObject = user.toObject();
    delete userObject.password;
    return { user: userObject, token };
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ email }).select('+password');
    if (!user || !user.password) {
        return null;
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        return null;
    }
    const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    const userObject = user.toObject();
    delete userObject.password;
    return { user: userObject, token };
});
exports.loginUser = loginUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findById(id);
});
exports.getUserById = getUserById;
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (userData.password) {
        userData.password = yield bcryptjs_1.default.hash(userData.password, 10);
    }
    return yield User_1.default.findByIdAndUpdate(id, userData, { new: true });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findByIdAndDelete(id);
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=UserService.js.map