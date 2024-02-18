import sequelize, { Model } from 'sequelize'

import db from '.'

class Book extends Model {
  declare id: string
  declare name: string
  declare description: string
  declare price: number
  declare author: string
}

Book.init({
  id: {
    type: sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  description: {
    type: sequelize.STRING,
    allowNull: false
  },
  price: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  author: {
    type: sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'book',
  timestamps: false
})

export default Book