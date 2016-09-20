module.exports = function(sequelize, DataTypes){
  return sequelize.define('user',{
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 50]
      }
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 50]
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 50]
      }
    }
  });
};
