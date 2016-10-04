module.exports = function(sequelize, DataTypes) {
    var questionRate = sequelize.define('questionRate', {
        rate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    return questionRate;
}
