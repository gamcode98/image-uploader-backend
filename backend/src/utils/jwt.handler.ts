import { Secret, sign, verify } from 'jsonwebtoken'
import { config } from '../config'
import boom from '@hapi/boom'

const generateToken = (id: string) => {
  const jwt = sign({ id }, config.jwtSecret as Secret, {
    expiresIn: '2h'
  })

  return jwt
}

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, config.jwtSecret as Secret)
  return isOk
}

export { generateToken, verifyToken }
