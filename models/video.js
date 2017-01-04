module.exports = function(sequelize, DataTypes) {

    var video = sequelize.define('video', {
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
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 255]
            }
        }
    });
    return video;
}
