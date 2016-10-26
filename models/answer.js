module.exports = function(sequelize, DataTypes) {
    var answer = sequelize.define('answer', {

        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 500]
            }
        }

    });
    return answer;
}
