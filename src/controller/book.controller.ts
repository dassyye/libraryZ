import { NextFunction, Request, Response } from 'express'
import BookService from '../services/book.service'

import Category from '../db/models/category'

class BookController {
  private service = new BookService()

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.get()

      res.status(status).json(message)
    } catch(err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { status, message } = await this.service.create(req.body)

      res.status(status).json(message)
    } catch(err) {
      next(err)
    }
  }

  async wishList(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookId } = req.params
      const userId = res.locals.user.id

      const { status, message } = await this.service.wishList(bookId, userId)

      res.status(status).json(message)
    } catch(err) {
      next(err)
    }
  }
}

export default BookController