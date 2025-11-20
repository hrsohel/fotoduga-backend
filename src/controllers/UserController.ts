import { Request, Response } from 'express';
import * as UserService from '../services/UserService';

export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await UserService.registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);
    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    // Assuming user id is available in req.user from an auth middleware
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await UserService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await UserService.updateUser(userId, req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    const user = await UserService.deleteUser(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// A simple logout. On the client side, the token should be deleted.
export const logout = async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
