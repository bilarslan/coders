module.exports = function(sequelize, DataTypes) {
    var videoComment = sequelize.define('videoComment', {

        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 1000]
            }
        }
    });
    return videoComment;
}
