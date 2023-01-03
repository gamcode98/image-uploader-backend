import { Secret, sign, verify } from 'jsonwebtoken'
import { config } from '../config'

const generateToken = (payload: {}, time: string = '2h') => {
  const jwt = sign(payload, config.jwtSecret as Secret, {
    expiresIn: time
  })

  return jwt
}

const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, config.jwtSecret as Secret)
  return isOk
}

export { generateToken, verifyToken }
