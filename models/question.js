module.exports = function(sequelize, DataTypes) {
    var question = sequelize.define('question', {

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 50]
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 500]
            }
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [3, 100]
            }
        }
    });
    return question;
}
