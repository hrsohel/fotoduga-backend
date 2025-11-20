import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { Types } from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

export const registerUser = async (userData: Partial<IUser>): Promise<{ user: IUser, token: string }> => {
  if (!userData.password) {
    throw new Error('Password is required');
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });
  await user.save();
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  const userObject = user.toObject();
  delete userObject.password;
  return { user: userObject as IUser, token };
};

export const loginUser = async (email: string, password: string): Promise<{ user: IUser, token: string } | null> => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.password) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return null;
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
  const userObject = user.toObject();
  delete userObject.password;
  return { user: userObject as IUser, token };
};

export const getUserById = async (id: string | Types.ObjectId): Promise<IUser | null> => {
  return await User.findById(id);
};

export const updateUser = async (id: string | Types.ObjectId, userData: Partial<IUser>): Promise<IUser | null> => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string | Types.ObjectId): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};
