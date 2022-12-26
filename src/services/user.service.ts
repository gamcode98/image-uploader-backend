import { RegisterUserDto, UpdateUserDto, UserDto } from '../dto/auth.dto'
import { User } from '../interfaces/user.interface'
import UserModel from '../models/user.model'

const registerNewUser = async ({
  email,
  passwordHash,
  username
}: RegisterUserDto): Promise<UserDto> => {
  const user: User = await UserModel.create({
    username,
    password: passwordHash,
    email
  })

  const userRegistered: UserDto = {
    _id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  return userRegistered
}

const findOneUserByEmail = async (
  email: UserDto['email']
): Promise<User | null> => {
  const userFound: User | null = await UserModel.findOne({ email })
  return userFound
}

const updateOneUser = async (
  _id: UserDto['_id'],
  data: UpdateUserDto
): Promise<UserDto | null> => {
  const user: User | null = await UserModel.findByIdAndUpdate(_id, data, {
    new: true
  })

  if (user === null) return null

  const userUpdated: UserDto = {
    _id: user._id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }

  return userUpdated
}

const deleteOneUser = async (_id: UserDto['_id']): Promise<User | null> => {
  const userDeleted: User | null = await UserModel.findByIdAndDelete({ _id })
  return userDeleted
}

export { registerNewUser, findOneUserByEmail, updateOneUser, deleteOneUser }
