import {Router} from 'express'

import path from 'path'

const infoRouter = new Router()

import os from 'os'
const cpus = os.cpus().length

infoRouter.get("/info", (req, res) => {
	const info = {
        path: process.cwd(),
        processId: process.pid,
        nodeVersion: process.version,
        titulo: process.title,
        sistema: process.platform,
        memory: process.memoryUsage.rss(),
        cantidadProcesadores: cpus,
        
    }
    console.log(
        "Directorio actual de trabajo: " + process.cwd() + "\n",
        "Id del proceso: " + process.pid + "\n",
        "Versión de Node: " + process.version + "\n",
        "Título del proceso: " + process.title + "\n",
        "Sistema operativo: " + process.platform + "\n",
        "Uso de memoria: " + process.memoryUsage.rss() + "\n",
        "Cantidad de procesadores: " + cpus + "\n"
    )
    res.send(info)
})

export default infoRouter