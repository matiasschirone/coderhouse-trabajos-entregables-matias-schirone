class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    };

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    };

    addMascotas(mascotas) {
        this.mascotas.push(mascotas);
    };

    countMascotas() {
        return this.mascotas.length;
    };

    addBook(nombre, autor) {
        this.libros.push({
            nombre,
            autor
        });
    };

    getBookNames() {
        return this.libros.map(libro => libro.nombre);
    };

};

const usuario = new Usuario('Juan', 'Perez', [{nombre: 'El señor de las moscas',autor:'William Golding'}, {nombre:'Fundacion',autor:'Isaac Asimov'}], ['gato Oscar', 'gata Willy', 'perro Tomy']);


                           
console.log('nombre del usuario', usuario.getFullName());
console.log('cantidad original de libros', usuario.getBookNames());
usuario.addBook(  'It','jk Stephen King');
usuario.addBook('el señor de los anillos','tolkien');
usuario.addBook('Cartas marcadas','Alejandro Dolina');
console.log('cantidad actual de libros', usuario.getBookNames());
console.log('cantidad de mascotas original', usuario.countMascotas());
usuario.addMascotas('gato Toto');
console.log('cantidad actual de mascotas', usuario.countMascotas());
