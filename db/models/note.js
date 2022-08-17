const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'owner_id' });
    }
  }
  Note.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    owner_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};
