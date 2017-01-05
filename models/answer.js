module.exports = function(sequelize, DataTypes) {
    var answer = sequelize.define('answer', {

        content: {
            type: DataTypes.STRING(5000),
            allowNull: false,
            validate: {
                len: [3, 5000]
            }
        }

    });
    return answer;
}
