const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const userGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true };
    // const users = await User.find(query)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // const totalRegistros = await User.countDocuments(query); // Con countDocuments() podemos contar los registros de la BD
    // Esta forma es para ejecutar los await de forma simultanea y que no se bloquee el flujo de ejecucion a parte de ganar milisegundos en dicha ejecucion.
    const [totalRegistros, usuarios] = await Promise.all([
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite)),
        User.countDocuments(query)
    ]);

    res.json({
        totalRegistros,
        usuarios
    });

    // res.json({
    //     totalRegistros,
    //     users
    // })




}

const userPost = async (req = request, res = response) => {


    const body = req.body; // Obtenemos los datos del body
    const { name, email, password, role } = body; // Desestructuramos los datos del body
    // Creamos una instancia del modelo para usarlo en la base de datos
    const user = new User({ name, email, password, role });


    // TODO Encriptar la contraseña
    // genSaltSync()  es la funcion que nos permite generar un numero aleatorio de vueltas para encriptar la contraseña, 10 es un numero conveniente
    const salt = bcryptjs.genSaltSync(10);
    // Pasamos salt y el password para que encripte la contraseña como parametros
    user.password = bcryptjs.hashSync(password, salt); // hashsync es para encriptar la contraseña de una sola vía

    // Guardar en BD
    // const user = new User(body); // Pero esto solo, no lo grabaria en la BD, solo lo guardara en el objeto user
    await user.save(); // Guarda en la BD asincronamente
    res.json(user);
}
const userPut = async (req = request, res = response) => {
    const id = req.params.id;
    const { _id, password, google, email, ...resto } = req.body;
    if (password) {
        // TODO Encriptar la contraseña
        // genSaltSync()  es la funcion que nos permite generar un numero aleatorio de vueltas para encriptar la contraseña, 10 es un numero conveniente
        const salt = bcryptjs.genSaltSync(10);
        // Pasamos salt y el password para que encripte la contraseña como parametros
        resto.password = bcryptjs.hashSync(password, salt); // hashsync es para encriptar la contraseña de una sola vía
    }
    const user = await User.findByIdAndUpdate(id, resto);

    // TODO validar con la base de datos
    res.json(user);
};


const userDelete = async(req, res = response) => {
    const { id } = req.params;
    // Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id);
    // Otra forma mejor de borrarlo es ponerle el state a false
    const user = await User.findByIdAndUpdate(id, {state: false});
    
    res.json( user)
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete

};