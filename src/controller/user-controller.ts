import { Request, Response } from "express";
import mongoose from "mongoose";
import { userSchema } from "../model/user";
import path from 'path';
import { randomBytes, pbkdf2, SALT_LENGTH, DIGEST, ITERATIONS, KEY_LENGTH, ROUNDS } from '../utils/auth-crypto'
import { genSalt, hash } from 'bcrypt';


const PATH_PRIVATE_KEY = path.join(__dirname, '..', '..', 'cert.pem')
const PATH_PUBLIC_KEY = path.join(__dirname, '..', '..', 'public', 'key.pem')

const X5U = 'http://localhost:3000/key.pem'

const orderConnection = mongoose.createConnection(
    "mongodb://localhost:27017/hotels"
  );

const userModel = orderConnection.model("User", userSchema);

const get = async (req: Request, res: Response) => {
 
};

const getOne = async (req: Request, res: Response) => {

};

const create = async (req: Request, res: Response) => {
    const { email, password, role } = req.body
    if(await userExists(email)) {
      res.status(400).json({
        "message": "User already exists"
      });
    } else {
      let salt = await randomBytes(SALT_LENGTH);
      let hashed = await pbkdf2(password, salt.toString('hex'), ITERATIONS, KEY_LENGTH, DIGEST)
      let user = newUser(email, role);
      user.password.setPassword(hashed.toString('hex'), salt.toString('hex'))
      await user.save()
      res.json(user)
    }
}

const login = async (req: Request, res: Response) => {
    
};

const userExists = (email: string) => userModel.findOne({ email }).exec()

const newUser = (email: string, role: number) => new userModel({ 
  email, 
  role, 
  password: {
    hash: '',
    salt: ''
  }
}) 

export const Users = {
    get,
    getOne,
    create,
    login
}