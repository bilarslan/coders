module.exports=function(sequelize, DataTypes){
  var answerRate = sequelize.define('answerRate' , {

      rate: {
        type:DataTypes.BOOLEAN,
        allowNull:false
      }

  });
    return answerRate;
}
