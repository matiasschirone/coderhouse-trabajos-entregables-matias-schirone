const Contenedor = require("./contenedor");

const contenedor = new Contenedor( './productos.txt')

contenedor.save({nombe: 'cafe', precio: 20, categoria: 'bebida'});

// contenedor.getById(5)

// contenedor.getAll()

//contenedor.deleteAll(2)
