import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';

export class AuthController {
  // Function for sign up
  public signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'User already exists.',
        });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        data: newUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error registering user.',
      });
    }
  };

  // Fucntion for login
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Find the user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'Invalid email or password.',
        });
        return;
      }
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);

      if (!isPasswordValid) {
        res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
        return;
      }

      // Generate a JWT
      const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
        expiresIn: '1h',
      });

      res.status(200).json({
        success: true,
        message: 'Login successful.',
        token,
      });
    } catch (error) {
      console.log("error", error)
      res.status(500).json({
        success: false,
        message: 'Error logging in.',
      });
    }
  };
}
