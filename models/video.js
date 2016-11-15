module.exports = function(sequelize, DataTypes) {

    var video = sequelize.define('video', {
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
        videoUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 300]
            }
        }
    });
    return video;
}
