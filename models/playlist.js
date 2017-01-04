module.exports = function(sequelize, DataTypes) {

    var playlist = sequelize.define('playlist', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 255]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 255]
            }
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 255]
            }
        }
    });

    return playlist;
}
