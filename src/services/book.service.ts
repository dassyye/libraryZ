import Book from '../db/models/book'
import BookCategory from '../db/models/bookCategory'
import Category from '../db/models/category'
import WishList from '../db/models/wishList'

import type{ ModelStatic } from 'sequelize'
import type{ IBook } from '../interfaces/IBook'

import resp from '../utils/resp'
import { bookBodySchema } from './validations/schema'
import { randomUUID } from 'crypto'

class BookService {
  private model: ModelStatic<Book> = Book

  async get() {
    const books = await this.model.findAll({
      include: [{ model: Category, as: 'categories'}]
    })

    return resp(200, books)
  }

  async create(book: IBook) {
    const bookParse = bookBodySchema.safeParse(book)

    if(!bookParse.success) return resp(400, { message: bookParse.error.message})

    let categories;

    try {
      const categorylist = await Promise.all(bookParse.data.categories.map((category) => {
        return Category.findByPk(category)
      }))

      if(categorylist.some(id => id)) {
        categories = categorylist
      }
    } catch(err) {
      return resp(400, 'category not found')
    }

    const createdBook = await this.model.create({
      id: randomUUID(),
      ...bookParse.data,
      categories
    })

    const bookCategory = bookParse.data.categories.map(e => ({
      bookId: createdBook.id,
      categoryId: e
    }))

    await BookCategory.bulkCreate(bookCategory)

    return resp(201, createdBook)
  }

  async wishList(bookId: string, userId: string) {
    const findBook = await this.model.findByPk(bookId)

    if(!findBook) return resp(404, 'Book not found!')

    const book = await WishList.findOne({
      where: {
        bookId,
        userId
      }
    })

    if(book) {
      await WishList.destroy({ where: {
        bookId,
        userId
      }})
      return resp(204, 'removed from wish list!')
    }

    await WishList.create({
      bookId,
      userId
    })
    return resp(201, 'added to wish list!')
  }
}

export default BookService