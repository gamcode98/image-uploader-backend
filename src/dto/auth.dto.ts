import { User } from '../interfaces/user.interface'

type PasswordHash = { passwordHash: string }

export type Register = Pick<User, 'username' | 'email'> & PasswordHash

export type Login = Omit<User, 'password'>
