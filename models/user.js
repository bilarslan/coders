var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 50]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 50]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 100]
            },
            set: function(value) {
                var hash = bcrypt.hashSync(value);
                this.setDataValue('password', hash);
            }
        }
    }, {
        hooks: {
            beforeValidate: function(user, options) {
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        instanceMethods: {
            toPublicJSON: function() {
                var user = this.toJSON();
                var _user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    userName: user.username,
                    registerData: user.createdAt
                }
                return _user;
            }
        }
    });
    return user;
};
