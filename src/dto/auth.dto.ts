import { User } from '../interfaces/user.interface'

export interface RegisterUserDto extends Pick<User, 'username' | 'email'> {
  passwordHash: string
}

export type RegisteredUserDto = Omit<User, 'password'>

export type Login = Omit<User, 'password'>
