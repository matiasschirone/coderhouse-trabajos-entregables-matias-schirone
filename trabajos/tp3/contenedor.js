const fs = require('fs')

class Contenedor {
    constructor(ruta){
        this.ruta = ruta       
    }   
    
    async save(obj){
        try {             
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')

            let dataArchParse = JSON.parse(dataArch)

            if (dataArchParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [...dataArchParse, { ...obj, id: dataArchParse[dataArchParse.length - 1].id + 1 } ], null, 2))                              
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify( [{ ...obj, id: 1 }], null, 2))                
            }
             console.log(`El archivo tiene el id: ${dataArchParse[dataArchParse.length - 1].id + 1}`)
        } catch (error) {
            console.log(error)
        }            
       
    }

    async getById(id){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')

            let dataArchParse = JSON.parse(dataArch)

            let producto = dataArchParse.find(producto => producto.id === id)

            if (producto) {                
                console.log(producto)
            } else {               
                console.log('No se encontro el producto')  
            }           
        } catch (error) {
            console.log(error)
        }
    }

    async getAll(){
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)

            if (dataArchParse.length) {
                console.log(dataArchParse) 
                return dataArchParse               
            } else {
                console.log('No hay productos')
                return null
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){

        let dataArch = await fs.promises.readFile(this.ruta, 'utf8')

        let dataArchParse = JSON.parse(dataArch)

        let producto = dataArchParse.find(prod => prod.id === id)

        if (producto) {
            const dataArchParseFiltrado = dataArchParse.filter(prod => prod.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltrado, null, 2), 'utf-8')
            console.log('Producto eliminado')
        }else{
            console.log('no existe el producto')
        }
    }

    async getLength(){
        const dataArch = await fs.promises.readFile(this.ruta, 'utf8')
        const dataArchParse = JSON.parse(dataArch)
        return dataArchParse.length
    }

    async getRandom(){
        const dataArch = await fs.promises.readFile(this.ruta, 'utf8')
        const dataArchParse = JSON.parse(dataArch)
        const random = Math.floor(Math.random() * dataArchParse.length)
        return dataArchParse[random]
    }
    
    async deleteAll(){
        await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf-8')
    }
}

module.exports = Contenedor
