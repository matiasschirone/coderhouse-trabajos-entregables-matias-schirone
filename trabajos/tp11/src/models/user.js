import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

const userSchema = new Schema({
  username: String,
    password: String,
    email: String,
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

const user = mongoose.model('user', userSchema);

export default user;