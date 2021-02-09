const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Accomodations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Accomodations.belongsTo(models.Locations, {
        foreignKey: 'location_id',
        onDelete: 'cascade',
        onUpdate: 'cascade',
        as: 'Accomodations'
      });
    }
  }
  Accomodations.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    location_id: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    facilities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    capacity: DataTypes.INTEGER,
    roomsLeft: DataTypes.INTEGER,
    averageRating: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Accomodations',
  });
  return Accomodations;
};