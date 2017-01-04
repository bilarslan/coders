module.exports = function (sequelize, DataTypes) {
    var question = sequelize.define('question', {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 255]
            }
        },
        content: {
            type: DataTypes.STRING(5000),
            allowNull: false,
            validate: {
                len: [3, 5000]
            }
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 255]
            }
        }
    });
    return question;
}