import { Register } from '../dto/auth.dto'
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

export { registerNewUser }
