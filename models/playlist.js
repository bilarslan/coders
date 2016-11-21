module.exports = function(sequelize, DataTypes) {

    var playlist = sequelize.define('playlist', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 250]
            }
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 300]
            }
        }
    });

    return playlist;
}
