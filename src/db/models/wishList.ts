import sequelize, { Model } from 'sequelize'

import Book from './book'
import User from './user'

import db from '.'

class WishList extends Model {
  declare bookId: string
  declare userId: string
}

WishList.init({
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
  userId: {
    type: sequelize.UUID,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
}, {
  sequelize: db,
  tableName: 'wish_list',
  underscored: true,
  timestamps: false
})

Book.belongsToMany(User, { // belongsToMany =>> pertence a varios
  foreignKey: 'bookId',
  otherKey: 'userId',
  as: 'users',
  through: WishList
})

User.belongsToMany(Book, { // belongsToMany =>> pertence a varios
  foreignKey: 'userId',
  otherKey: 'bookId',
  as: 'books',
  through: WishList
})

export default WishList