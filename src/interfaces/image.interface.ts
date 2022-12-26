import Base from './base.interface'

export interface Image extends Base {
  name: string
  path: string
  userId: string
}
