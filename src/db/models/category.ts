import sequelize, { Model } from 'sequelize'

import db from '.'

class Category extends Model {
  declare id: string
  declare name: string
}

Category.init({
  id: {
    type: sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'category',
  timestamps: false
})

export default Category