import express from 'express'
const { Router } = express
import {fork} from 'child_process'

const routerRandom = new Router()

routerRandom.get("/api/randoms", (req, res) => {
	let { cant } = req.query;
	console.log(cant);
	const random = fork("./src/utils/calculo", [cant]);
	random.send("start");
	random.on("message", obj => {
		res.json(obj);
	});
});

export default routerRandom