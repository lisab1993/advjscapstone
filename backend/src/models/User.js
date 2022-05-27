const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


const userSchema = Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },{
        toObject: {
            virtuals: true
        }
    }
);

userSchema.statics.signup = async function (username, password) {
    const user = new this()
    user.username = username
    user.hashPassword(password)

    await user.save()
    return user
}


userSchema.methods.hashPassword = function (plainTextPass) {
    const saltRounds = 10
    this.password = bcrypt.hashSync(plainTextPass, saltRounds)
}

userSchema.methods.sanitize = function () {
    return {
        ...this._doc,
        password: undefined
    }
}

userSchema.methods.verifyLoginPassword = function (plainTextPass) {
    return bcrypt.compareSync(plainTextPass, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User