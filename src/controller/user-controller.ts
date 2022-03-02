import { Request, Response } from "express";
import mongoose from "mongoose";
import { userSchema } from "../model/user";
import path from 'path';


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

};

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    let user = await userModel.findOne({email}).exec()
    if (user) {
        
    }
};

export const Users = {
    get,
    getOne,
    create,
    login
}