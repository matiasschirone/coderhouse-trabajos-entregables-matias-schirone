const mongoose = require("mongoose");

const dotenv = require("dotenv").config();

const mongoConnect = async () => {
	try {
		const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/?retryWrites=true&w=majority`;
		mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		console.log("MongoDb conectado");
	} catch (error) {
		console.error(`error de conexion: ${error}`);
	}
};

export default mongoConnect;