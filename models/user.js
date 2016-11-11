var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 50]
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
                len: [6, 100]
            },
            set: function(value) {
                var hash = bcrypt.hashSync(value);
                this.setDataValue('password', hash);
            }
        },
        imgUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false,
            defaultValue:'./img/avatar/default_avatar.png',
            validate: {
                len: [3, 250]
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
            },
            generateToken: function() {
                var id = this.get('id');
                var username = this.get('username');
                var token = jwt.sign({
                    id: id,
                    username: username
                }, "secretkey", {
                    expiresIn: 60 * 24
                });
                return token;
            }
        }
    });
    return user;
};
