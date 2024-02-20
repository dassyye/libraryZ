import { Router } from 'express'
import BookController from '../controller/book.controller'
import { verifyToken } from '../jwt/jwt'

const bookController = new BookController()

const bookRouter = Router()

bookRouter.get('/book', bookController.get.bind(bookController))
bookRouter.post('/book', bookController.create.bind(bookController))
bookRouter.patch('/wishlist/:bookId', verifyToken, bookController.wishList.bind(bookController))

export default bookRouter