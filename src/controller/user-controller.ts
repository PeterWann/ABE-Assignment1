import { Request, Response } from "express";
import { sign } from 'jsonwebtoken';
import { readFile } from 'fs';
import mongoose from "mongoose";
import { userSchema } from "../model/user";
import { join }  from 'path';
import { randomBytes, pbkdf2, SALT_LENGTH, DIGEST, ITERATIONS, KEY_LENGTH, ROUNDS } from '../utils/auth-crypto'


const PATH_PRIVATE_KEY = join(__dirname, '..', '..', 'private-rsa256.key')
const PATH_PUBLIC_KEY = join(__dirname, '..', '..', 'public', 'rsa256.key.pub')

const X5U = 'http://localhost:3000/rsa256.key.pub'

const orderConnection = mongoose.createConnection(
    "mongodb://localhost:27017/hotels"
  );

const userModel = orderConnection.model("User", userSchema);

const get = async (req: Request, res: Response) => {
 
};

const getOne = async (req: Request, res: Response) => {

};

const create = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body
    if(await userExists(email)) {
      res.status(400).json({
        "message": "User already exists"
      });
    } else {
      let salt = await randomBytes(SALT_LENGTH);
      let hashed = await pbkdf2(password, salt.toString('hex'), ITERATIONS, KEY_LENGTH, DIGEST)
      let user = newUser(name, email, role);
      user.password.setPassword(hashed.toString('hex'), salt.toString('hex'))
      await user.save()
      res.json(user)
    }
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  let user = await userModel.findOne({ email }).exec()
  if(user) {
    if(await user.password.isPasswordValid(password)) {
      readFile(PATH_PRIVATE_KEY, (err, privateKey) => {
        if(err) {
          res.sendStatus(500)
        } else {
          sign({ email }, privateKey, { expiresIn: '1h', header: { alg: 'RS256', x5u: X5U} }, (err, token) => {
            if(err) {
              res.status(400).json({
                message: err.message
              })
            } else {
              res.json({ token })
            }
          })
        }
      })
    } else {
      res.sendStatus(403)
    }
  } else {
    res.sendStatus(400)
  }
};

const userExists = (email: string) => userModel.findOne({ email }).exec()

const newUser = (name: string, email: string, role: number) => new userModel({ 
  name,
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