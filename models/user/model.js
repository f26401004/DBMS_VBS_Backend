import bcrypt from 'bcrypt'
import errorHandler from '../../utils/errorHandler.js'

export default (sequelize, Datatypes) => {
  const user = sequelize.define('Users', {
    username: {
      type: Datatypes.STRING(),
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    password: {
      type: Datatypes.CHAR(60),
      allowNull: false,
      unique: true
    },
    authCode: {
      type: Datatypes.CHAR(20),
      allowNull: false,
      unique: true
    },
    SSN: {
      type: Datatypes.CHAR(10),
      allowNull: false,
      unique: true
    },
    assets: {
      type: Datatypes.DOUBLE(),
      allowNull: false,
      defaultValue: 0
    },
    permission: {
      type: Datatypes.INTEGER(),
      allowNull: false,
      defaultValue: 0
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
      models.Users.hasMany(models.Transactions, { foreignKey: 'user', sourceKey: 'username' })
      models.Users.hasMany(models.Transactions, { foreignKey: 'target', sourceKey: 'username' })
      models.Users.hasMany(models.Insurances, { foreignKey: 'user', sourceKey: 'username' })
      models.Users.hasMany(models.Cards, { foreignKey: 'owner', sourceKey: 'username' })
      models.Users.hasMany(models.Deposits, { foreignKey: 'user', sourceKey: 'username' })
    }
  })

  user.hash = async (target) => {
    try {
      const result = await bcrypt.hash(target, 20)
      return result
    } catch (error) {
      console.log(error)
      throw new errorHandler ('Server Internal Error', 500, 'The bcrypt hash function failed!!')
    }
  }

  user.verify = async (target, hashed) => {
    try {
      const result = await bcrypt.compare(target, hashed)
      return result
    } catch (error) {
      console.log(error)
      throw new errorHandler ('Unauthorized Error', 401, 'The bcrypt compare function failed!!')
    }
  }

  return user
}