const bcrypt = require('bcryptjs');

module.exports = (sequelize , DataTypes) => {
    const User = sequelize.define('User',{
        id : {type:DataTypes.INTEGER,autoIncrement : true, primaryKey : true},
        name : {type : DataTypes.STRING , allowNull : false},
        username : {type : DataTypes.STRING, allowNull : false},
        email : {type: DataTypes.STRING, allowNull : false, unique : true, validate : {isEmail : true}},
        password : {type: DataTypes.STRING , allowNull :false},
        profile_pic : {type : DataTypes.STRING},
    },
    {
        hooks : {
            beforeCreate : async(user) => {
                user.password = await bcrypt.hash(user.password , 15);
            }
        }
    });
    User.prototype.validatePassword = async function(password){
        return await bcrypt.compare(password,this.password);
    }
    return User;
};

