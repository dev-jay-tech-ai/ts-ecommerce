import express, { Request, Response } from 'express'
import expressAsyncHandler from 'express-async-handler'
import { UserModel } from '../models/userModel'
import bcrypt from 'bcryptjs'
import { getRightTarget } from '@typegoose/typegoose/lib/internal/utils'
import { generateToken } from '../utils'

export const userRouter = express.Router()

userRouter.post('/signin',expressAsyncHandler(async(req: Request, res: Response) => {
    const user = await UserModel.findOne({ email: req.body.email })
    if(user) {
      if(bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        })
        return 
      }
    }
    res.status(401).json({ message: 'Invaild email or password' })
  }) 
)