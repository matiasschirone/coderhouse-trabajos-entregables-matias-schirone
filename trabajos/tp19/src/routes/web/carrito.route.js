import { express } from 'express';
import { Router } from 'express';
import { postCarrito, deleteCarrito, postbyIDCarrito, deleteByIdCarrito, getCarritoById, listarCarrito } from '../../controllers/controllersCarrito'


const routerCarrito = Router();

routerCarrito.post('/', postCarrito);
routerCarrito.delete('/:id', deleteCarrito);
routerCarrito.post('/:id/productos/:id_prod', postbyIDCarrito);
routerCarrito.delete('/:id/productos/:id_prod', deleteByIdCarrito);
routerCarrito.get('/:id', getCarritoById);
routerCarrito.get('/:id/productos', listarCarrito);

export default routerCarrito;
