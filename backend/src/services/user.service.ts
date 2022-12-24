import { User } from '../interfaces/user.interface'
import UserModel from '../models/user.model'

const findOneUserByEmail = async (email: string): Promise<User | null> => {
  const user: User | null = await UserModel.findOne({ email })
  return user
}

export { findOneUserByEmail }
