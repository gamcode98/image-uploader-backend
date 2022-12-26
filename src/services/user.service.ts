import { RegisteredUserDto, RegisterUserDto } from '../dto/auth.dto'
import { User } from '../interfaces/user.interface'
import UserModel from '../models/user.model'

const registerNewUser = async ({
  email,
  passwordHash,
  username
}: RegisterUserDto): Promise<RegisteredUserDto> => {
  const user: User = await UserModel.create({
    username,
    password: passwordHash,
    email
  })

  const userRegistered: RegisteredUserDto = {
    _id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  return userRegistered
}

const findOneUserByEmail = async (email: string): Promise<User | null> => {
  const user: User | null = await UserModel.findOne({ email })
  return user
}

export { registerNewUser, findOneUserByEmail }
