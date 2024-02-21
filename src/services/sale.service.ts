import type { ModelStatic } from 'sequelize'
import resp from '../utils/resp'

import Sale from '../db/models/sale'
import BookSale from '../db/models/bookSale'
import Book from '../db/models/book'

import { saleBodySchema } from './validations/schema'
import type { ISale } from '../interfaces/ISale'
import { randomUUID } from 'crypto'

class SaleService {
  private model: ModelStatic<Sale> = Sale

  async get(userId?: string) {
    if(userId) {
      return resp(200, await this.model.findAll({
        where: {
          userId,
        },
        include: [{ model: Book, as: 'books' }]
      }))
    }
    console.log(userId)

    return resp(200, await this.model.findAll({
      where: {userId},
      include: [{ model: Book, as: 'books' }]
    }))
  }

  async create(sale: ISale) {
    const saleParse = saleBodySchema.safeParse(sale)

    if(!saleParse.success) {
      return resp(400, saleParse.error)
    }

    let books;

    try {
      const bookslist = await Promise.all(saleParse.data.books.map(async (id) => {
        return await Book.findByPk(id.bookId)
      }))
  
      if(bookslist.some(book => book)) {
        books = bookslist
      }
    } catch(err) {
      return resp(404, 'book not found')
    }

    const createdSale = await this.model.create({
      id: randomUUID(),
      ...saleParse.data,
      books
    })

    const bookSale = saleParse.data
    .books.map(book => ({
      ...book,
      saleId: createdSale.id
    }))

    await BookSale.bulkCreate(bookSale)

    return resp(201, createdSale)
  }
}

export default SaleService