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
    contactSubject: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contactMessage:{
      type : DataTypes.STRING(1000),
      allowNull:false,
      validate:{
        len : [1,1000]
      }
    }

  });

  return contact;
}
