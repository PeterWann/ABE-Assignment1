import { Schema } from 'mongoose'
import { DIGEST, ITERATIONS, KEY_LENGTH, pbkdf2 } from '../utils/auth-crypto'

export interface User {
  name: String
  password: Password
  email: string
  role: UserRoles
}

export enum UserRoles {
    Manager,
    Clerk,
    Guest,
    Invalid
}

export interface Password {
  hash: string
  salt: string
  setPassword(hash: string, salt: string): void
  isPasswordValid(password: string): boolean
}

export const PasswordSchema = new Schema<Password> ({
  hash: { type: String, required: true },
  salt: { type: String, required: true }
})

PasswordSchema.methods.isPasswordValid = async function(password: string) {
  const hash = await pbkdf2(password, this.salt, ITERATIONS, KEY_LENGTH, DIGEST)
  return this.hash === hash.toString('hex')
}

PasswordSchema.methods.setPassword = function(hash: string, salt: string) {
  this.hash = hash
  this.salt = salt
}

export const userSchema = new Schema<User>({
  name: { type: String, required: true }, 
  password: { type: PasswordSchema, required: true },
  email: { type: String, required: true },
  role: { type: Number, required: true }
})