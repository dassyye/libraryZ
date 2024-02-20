import { Router } from 'express'
import userRouter from './user'
import bookRouter from './book'

const router = Router()

router.use(userRouter)
router.use(bookRouter)

export default router