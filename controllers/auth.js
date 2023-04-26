const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');


// definimos el controlador login
const login = async(req = request, res= response) => {
    const { email, password } = req.body;
    try {
        // TODO verificar si el email existe
        const user = await User.findOne({email});
        if(!user){  
            return res.status(400).json({
                msg:"El usuario no existe - email"
            })
        }


        // TODO verificar si el usuario esta activo
        const isActive = user.state;
        if(!isActive){
             return res.status(400).json({
                msg:"El usuario no esta activo - estado: false"
            })
        }


        // TODO verificar el password
        // SINCRONA
        const validPassword = bcryptjs.compareSync(password, user.password); // bcryptjs tiene un metodo para comparar passwords pero no es una funcion asincrona ¡cuidado!
        if(!validPassword){ 
            return res.status(400).json({
                msg:"El password no es valido"
            })
        }   

        // TODO generar el JWT
        const token = await generarJWT(user.id);

        // TODO enviar el token




        res.json({
            msg: 'Login ok',
            user,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            msg:"Hable con el administrador"
        })
    }
    
}

module.exports = {
    login
}