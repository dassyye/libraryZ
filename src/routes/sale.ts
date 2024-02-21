import { Router } from 'express'
import SaleController from '../controller/sale.controller'
import { verifyToken } from '../jwt/jwt'

const saleController = new SaleController()

const saleRouter = Router()

saleRouter.get('/sale', verifyToken, saleController.get.bind(saleController))
saleRouter.post('/sale', verifyToken, saleController.create.bind(saleController))

export default saleRouter