module.exports = function(sequelize, DataTypes) {
    var answer = sequelize.define('answer', {

        content: {
            type: DataTypes.STRING(1000),
            allowNull: false,
            validate: {
                len: [3, 1000]
            }
        }

    });
    return answer;
}
