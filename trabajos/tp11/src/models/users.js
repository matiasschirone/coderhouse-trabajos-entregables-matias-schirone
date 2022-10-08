const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    name: String,
    email: String,
});

userSchema.methods.encryptPassword = (email) => {
    return bcrypt.hashSync(email, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (email) {
    return bcrypt.compareSync(email, this.email);
}; 

module.exports = mongoose.model('User', userSchema);