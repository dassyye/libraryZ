import sequelize, { Model } from 'sequelize'

import User from './user'

import db from '.'

class Sale extends Model {
  declare id: string
  declare userId: string
  declare total: number
  declare date: string
}

Sale.init({
  id: {
    type: sequelize.UUID,
    allowNull: false,
    primaryKey: true
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
  },
  total: {
    type: sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'sale',
  timestamps: false,
  underscored: true
})

Sale.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
})

export default Sale