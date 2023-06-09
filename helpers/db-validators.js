const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async(role='') => {
    const existeRole = await Role.findOne({ role });
    if(!existeRole){
         throw new Error(`El role ${role} no existe en la Base de Datos`);
    }
}

const existeEmail = async (email='') => {
    const existeEmail = await User.findOne({email}); // El metodo findOne() es la funcion para buscar por email
    if(existeEmail){
        throw new Error(`El email ${ email } ya está registrado en nuestra Base de Datos`);
    }
} 
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await User.findById(id); // El metodo findById() es la funcion MOngoDB para buscar por id
    if(!existeUsuario){
        throw new Error(`El id ${ id } no existe en la Base de Datos`);
    }
} 

module.exports = {
    isRoleValid,
    existeEmail,
    existeUsuarioPorId
}

