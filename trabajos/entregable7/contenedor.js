const fs = require("fs");

class Contenedor {
	constructor(knex, tabla) {
		this.knex = knex;
		this.tabla = tabla;
	}

	async save(obj) {
		try {
			await this.knex(this.tabla).insert(obj);
		} catch (error) {
			console.log("error de escritura", error);
		}
	}
	 async getAll() {
		try {
			let dataArchivo = await this.knex(this.tabla).select();
			return dataArchivo;
		} catch (error) {
			console.log("error de lectura", error);
		}
	 }

	 async getById(id) {
		try {
			let dataArchivo = await this.knex(this.tabla).select('*').where({ id: id });
			return dataArchivo[0];
		} catch (error) {
			console.log("error de lectura", error);
		}
	 }

	 async updateById(id, product) {
		try {
			let dataArchivo = await this.knex.from(this.tabla).where({ id: id }).update({...product});
			return { message: "producto actualizado" };
		} catch (error) {
			console.log("error de lectura", error);
		}
	 }

	 async deleteById(id) {
		try {
			let dataArchivo = await this.knex.from(this.tabla).where({ id: id }).del();
			return { message: "producto eliminado" };
		} catch (error) {
			console.log(`Error al eliminar el producto con id ${id}`);
		}
	 }

	 async deleteAll() {
		try {
			let dataArchivo = await this.knex.from(this.tabla).del();
			return { message: "productos eliminados" };
		} catch (error) {
			console.log(`Error al eliminar los productos`);
		}
	 }
}

module.exports = { Contenedor };