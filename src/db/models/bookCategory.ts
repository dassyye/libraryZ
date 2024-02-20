import sequelize, { Model } from 'sequelize'

import Book from './book'
import Category from './category'

import db from '.'

class BookCategory extends Model {
  declare bookId: string
  declare categoryId: string
}

BookCategory.init({
  bookId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'book',
      key: 'id'
    },
    primaryKey: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  categoryId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'category',
      key: 'id'
    },
    primaryKey: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize: db,
  tableName: 'book_category',
  timestamps: false,
  underscored: true
})

Book.belongsToMany(Category, { // belongsToMany =>> pertence a varios
  foreignKey: 'bookId',
  otherKey: 'categoryId',
  as: 'categories',
  through: BookCategory
})

Category.belongsToMany(Book, { // belongsToMany =>> pertence a varios
  foreignKey: 'categoryId',
  otherKey: 'bookId',
  as: 'books',
  through: BookCategory
})

export default BookCategory