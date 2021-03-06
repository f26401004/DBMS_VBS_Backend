export default (sequelize, Datatypes) => {
  const insuranceType = sequelize.define('InsuranceTypes', {
    id: {
      type: Datatypes.INTEGER(),
      primaryKey: true,
      allowNull: false,
      unique: true,
      autoIncrement: true
    },
    name: {
      type: Datatypes.STRING(),
      allowNull: false
    },
    value: {
      type: Datatypes.INTEGER(),
      allowNull: false
    },
    interestRate: {
      type: Datatypes.DOUBLE(8, 5),
      allowNull: false
    },
    terms: {
      type: Datatypes.INTEGER(),
      allowNull: false,
      defaultValue: 1
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
      // define the itid field has many in insurance table
      models.InsuranceTypes.hasMany(models.Insurances, { foreignKey: 'type', sourceKey: 'id' })
    }
  })

  return insuranceType
}