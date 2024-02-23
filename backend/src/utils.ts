import { NextFunction } from "express"
import { User } from "./models/userModel"
import jwt from "jsonwebtoken"

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin

    },
    process.env.JWT_SECRET || 'somthingsecret',
    {
      expiresIn: '30d',
    }
  )
}

export const isAuth = (req: Request, res: Response, next: NextFunction)  => {
  const { authorization } = req.headers
  if(authorization) {
    const token = authorization.slice(7, authorization.length)
    const decode = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret')

    req.user = decode as {
      _id: string
      name: string
      email: string
      isAdmin: string
      token: string
    }
    next()
  } else {
    res.status(401).send({ message: 'No Token' })
  }
}