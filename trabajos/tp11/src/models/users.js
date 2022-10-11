import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}
