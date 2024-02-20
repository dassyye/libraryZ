import { Router } from 'express'
import UserController from '../controller/user.controller'

const userController = new UserController()

const userRouter = Router()

userRouter.get('/user', userController.get.bind(userController))
userRouter.post('/user', userController.login.bind(userController))

export default userRouter