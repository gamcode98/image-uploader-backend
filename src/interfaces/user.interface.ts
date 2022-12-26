import Base from './base.interface'

export interface User extends Base {
  username: string
  email: string
  password: string
}
