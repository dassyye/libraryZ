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

    if(!bookParse.success) {
      return resp(400, { message: bookParse.error.message})
    }

    // verificar se a categoria existe!

    const categories = await Promise.all(book.categories.map(async (id) => {
      return await Category.findByPk(id) // find by primary key => pelo id da tabela
    }))

    // some= algum!!!, se algum...

    if(categories.some(id => !id)) return resp(404, { message: 'Category not found!' })

    const createdBook = await this.model.create({
      id: randomUUID(),
      ...bookParse.data
    })

    const bookCategory = bookParse.data.categories?.map(id => ({
      bookId: createdBook.id,
      categoryId: id
    }))

    await BookCategory.bulkCreate(bookCategory)

    return resp(201, { message: createdBook })
  }

  async wishList(bookId: string, userId: string) {
    const findBook = await this.model.findByPk(bookId)

    if(!findBook) {
      return resp(404, 'Book not found!')
    }

    const book = await WishList.findOne({ where: {
      bookId,
      userId
    }})

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