import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
});

userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(email, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(email, this.email);
};

module.exports = mongoose.model('Users', userSchema);