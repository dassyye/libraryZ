import { NextFunction, Request, Response } from 'express'
import SaleService from '../services/sale.service'

class SaleController {
  private service = new SaleService()

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id
      const { status, message } = await this.service.get(userId)

      res.status(status).json(message)
    } catch(err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id
      req.body.userId = userId
      const { status, message } = await this.service.create(req.body)
      res.status(status).json(message)
    } catch(err) {
      next(err)
    }
  }
}

export default SaleController