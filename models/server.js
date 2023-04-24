const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // TODO middelwares
        this.middlewares();

        // TODO rutas de mi aplicacion
        this.routes();
    }
    middlewares() { 
        // uso de cors para restringir las peticiones
        this.app.use( cors() );

        // Lectura y parseo del body del request
        this.app.use( express.json() );
        
        // directorio publico
        this.app.use(express.static('public'));
    }
    // Rutas o endpoints
    routes() {
       this.app.use(this.usersPath, require('../routes/user.routes.js'));
    }

    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }

}

module.exports = Server;