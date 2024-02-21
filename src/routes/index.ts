import { Router } from 'express'
import userRouter from './user'
import bookRouter from './book'
import saleRouter from './sale'

const router = Router()

router.use(userRouter)
router.use(bookRouter)
router.use(saleRouter)

export default router