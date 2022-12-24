import { Schema, model } from 'mongoose'
import { User } from '../interfaces/user.interface'

const UserSchema = new Schema<User>(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const UserModel = model('users', UserSchema)

export default UserModel
