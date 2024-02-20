import jwt, { SignOptions } from 'jsonwebtoken'
import 'dotenv/config'
import { NextFunction, Request, Response } from 'express'

const secret = process.env.JWT_SECRET as string

export const sign = (payload: { id: string, email: string }, expiresIn = '4d') => {
  const jwtConfig: SignOptions = {
    algorithm: 'HS256',
    expiresIn
  } 

  return jwt.sign(payload, secret, jwtConfig)
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')
    if(!token) return res.status(401).json({ message: 'Unauthorized!' })

    const decoded = jwt.verify(token, secret)

    res.locals.user = decoded
    next()
  } catch(err) {
    next(err)
  }
}