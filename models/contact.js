module.exports = function (sequelize,DataTypes) {
  var contact=sequelize.define('contact',{

    contactName: {
      type : DataTypes.STRING,
      allowNull:false
    },
    contactMail: {
      type : DataTypes.STRING,
      allowNull:false
    },
    contactMessage:{
      type : DataTypes.STRING,
      allowNull:false,
      validate:{
        len : [1,500]
      }
    }

  });

  return contact;
}
