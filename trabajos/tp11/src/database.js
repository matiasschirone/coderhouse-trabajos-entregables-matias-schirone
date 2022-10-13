import mongoose from "mongoose";
import bcrypt from "bcrypt";
import * as model from "./models/user.js";

CRUD()

async function CRUD() {
  try{
    const URL = "mongodb://localhost:27017/user-passport";
    let db = await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conectado a la base de datos");
  }
  catch(err){
    console.log("Error al conectar a la base de datos");
  } 
}

export default CRUD;