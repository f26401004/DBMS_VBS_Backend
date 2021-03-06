import bcrypt from 'bcrypt'
import errorHandler from '../../utils/errorHandler.js'

export default (sequelize, Datatypes) => {
  const card = sequelize.define('Cards', {
    cardNo: {
      type: Datatypes.STRING(16),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    csc: {
      type: Datatypes.STRING(4),
      allowNull: false
    },
    type: {
      type: Datatypes.INTEGER(),
      allowNull: false
    },
    assets: {
      type: Datatypes.DOUBLE(),
      allowNull: false,
      defaultValue: 0
    },
    owner: {
      type: Datatypes.STRING(),
      allowNull: false
    },
    bonusPoint: {
      type: Datatypes.INTEGER(),
      defaultValue: 0,
      allowNull: false
    },
    createdBy: {
      type: Datatypes.STRING(),
      allowNull: false
    },  
    updatedBy: {
      type: Datatypes.STRING(),
      allowNull: false
    }
  }, {
    associate: (models) => {
      models.Cards.belongsTo(models.CardTypes, { foreignKey: 'type', targetKey: 'id' })
      models.Cards.belongsTo(models.Users, { foreignKey: 'owner', targetKey: 'SSN', onDelete: 'CASCADE' })
      models.Cards.hasMany(models.Transactions, { foreignKey: 'userCard', sourceKey: 'cardNo', onDelete: 'CASCADE' })
      models.Cards.hasMany(models.Transactions, { foreignKey: 'targetCard', sourceKey: 'cardNo', onDelete: 'CASCADE' })
    }
  })

  card.hash = async (target) => {
    try {
      const result = await bcrypt.hash(target, 20)
      return result
    } catch (error) {
      console.log(error)
      throw new errorHandler ('Server Internal Error', 500, 'The bcrypt hash function failed!!')
    }
  }

  card.verify = async (target, hashed) => {
    try {
      const result = await bcrypt.compare(target, hashed)
      return result
    } catch (error) {
      console.log(error)
      throw new errorHandler ('Unauthorized Error', 401, 'The bcrypt compare function failed!!')
    }
  }

  return card
}