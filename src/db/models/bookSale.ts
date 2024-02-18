import sequelize, { Model } from 'sequelize'

import Book from './book'
import Sale from './sale'

import db from '.'

class BookSale extends Model {
  declare bookId: string
  declare saleId: string
  declare quantity: number
}

BookSale.init({
  bookId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'book',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  saleId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'sale',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  quantity: {
    type: sequelize.INTEGER,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'book_sale',
  timestamps: false,
  underscored: true
})

Book.belongsToMany(Sale, { // belongsToMany =>> pertence a varios
  foreignKey: 'bookId',
  otherKey: 'saleId',
  as: 'sales',
  through: BookSale
})

Sale.belongsToMany(Book, { // belongsToMany =>> pertence a varios
  foreignKey: 'saleId',
  otherKey: 'bookId',
  as: 'books',
  through: BookSale
})

export default BookSale