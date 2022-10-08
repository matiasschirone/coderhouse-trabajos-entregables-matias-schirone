import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
    nombre: nombre,
    email: string
})

UserSchema.methods.encryptPassword = (nombre) => {
    return bcrypt.hashSync(nombre, bcrypt.genSaltSync(10));
}

UserSchema.methods.comparePassword = (nombre) => {
    return bcrypt.compareSync(nombre, this.nombre);
}

export default mongoose.model('users', UserSchema);
