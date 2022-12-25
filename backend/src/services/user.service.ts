import { Register } from '../dto/auth.dto'
import { User } from '../interfaces/user.interface'
import UserModel from '../models/user.model'

const registerNewUser = async ({ email, passwordHash, username }: Register) => {
  await UserModel.create({
    username,
    password: passwordHash,
    email
  })

  const user = { username, email }

  return user
}

const findOneUserByEmail = async (email: string): Promise<User | null> => {
  const user: User | null = await UserModel.findOne({ email })
  return user
}

export { registerNewUser, findOneUserByEmail }
