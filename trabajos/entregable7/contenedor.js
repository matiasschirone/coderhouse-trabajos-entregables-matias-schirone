class Contenedor {
	constructor(knex, tabla) {
		this.knex = knex;
		this.tabla = tabla;
	}

	async save(obj) {
		try {
			await this.knex(this.tabla).insert(obj);
			return { message: "Producto agregado" };
		} catch (error) {
			console.log(`Error al guardar el producto: ${error}`);
		}
	}

	async getById(id) {
		try {
			let item = await this.knex.from(this.tabla).select("*").where({ id: id });
			return item[0];
		} catch (error) {
			console.log(`Error al buscar el producto: ${error}`);
		}
	}


	async getAll() {
		try {
			let items = await this.knex.from(this.tabla).select("*");
			return items;
		} catch (error) {
			console.log(error);
		}
	}

	async updateById(id, product) {
		try {
			console.log(product);
			await this.knex
				.from(this.tabla)
				.where({ id: id })
				.update({ ...product });
			return { message: "Producto actualizado" };
		} catch (error) {
			console.log(`Error al actualizar el producto: ${error}`);
		}
	}


	async deleteById(id) {
		try {
			await this.knex.from(this.tabla).where({ id: id }).del();
			return { message: "Item eliminado" };
		} catch (error) {
			console.log(`Error al eliminar el producto: ${error}`);
		}
	}


	async deleteAll() {
		try {
			await this.knex.from(this.tabla).del();
			return { message: "Todos los productos eliminados" };
		} catch (error) {
			console.log(`Error al eliminar los productos: ${error}`);
		}
	}
}

module.exports = { Contenedor };