const { response,request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const userGet = async (req= request, res=response	) => {
   
    const {limite=5, desde=0} = req.query;    
    const users = await User.find()
    .skip(Number(desde))
    .limit(Number(limite));
    res.json({
        users //users: users
    });
   
    
}

const userPost = async(req=request, res=response) => {

    
    const body = req.body; // Obtenemos los datos del body
    const {name, email, password, role} = body; // Desestructuramos los datos del body
    // Creamos una instancia del modelo para usarlo en la base de datos
    const user = new User({name, email, password, role});

        
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
const userPut = async(req, res) => { 
    const id = req.params.id;
    const {_id, password, google, email, ...resto} = req.body;
    if(password){
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
const userPatch = (req, res) => {   
    const {id} = req.params;
    res.json({
       
        id
    })
}

const userDelete = (req, res) => {
    const {id} = req.params;
        res.json({
        msg: `delete API con id: ${id}`,
        id
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,    
    userPatch

};