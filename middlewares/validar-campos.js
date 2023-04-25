const { validationResult } = require("express-validator");

// Recuerda que un middleware no es mas que una funcion que se ejecuta
const validarCampos = async (req, res, next) => {
    const errors = validationResult(req); // Validamos los datos del body
    if(!errors.isEmpty()){
        
        return await res.status(400).json({ 
            errors: errors.array()
        });
    }
    next(); // Si no hay errores, pasamos al siguiente middleware
}

module.exports = {
    validarCampos
}