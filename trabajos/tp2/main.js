const Contenedor = require("./contenedor");

const contenedor = new Contenedor( './productos.txt')

contenedor.save({nombe: 'leche', precio: 20, categoria: 'bebida'});

//contenedor.getById(7)

// contenedor.getAll()

//contenedor.delete(5)

//contenedor.deleteAll()
