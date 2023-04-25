// Requires
const { Router } = require('express');
const { userGet, 
        userPost,
        userPut,
        userPatch,
        userDelete
        } = require('../controllers/user.controller');
const router = Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isRoleValid, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');


// CRUD
// GET
router.get('/', userGet);
// POST
router.post('/', [
        check('email', 'This email is invalid').isEmail(), // Chequea que sea un email
        check('email').custom( existeEmail ), // Chequea que no exista en la base de datos
        check('password', 'Password is required').not().isEmpty(), // Chequea que no este vacio
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }), // Chequea que sea minimo 6 caracteres
        check('name', 'Name is required').not().isEmpty(), // Chequea que no este vacio
        check('name', 'Name must be at least 3 characters').isLength({ min: 3 }), // Chequea que sea minimo 3 caracteres
        check('role', 'Role is required').not().isEmpty(), // Chequea que no este vacio
        // check('role', 'Role is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']), // Chequea que sea un rol valido pero no se valida contra una BD

        // custom() es una función que se ejecuta antes de que se ejecute el middleware, se le pasa como parametro el valor que se quiere validar,        
        // esta funcion se encarga de validar si el rol existe en la base de datos, si no existe, se lanza un error.
        // Si la funcion se ejecuta correctamente, se ejecuta el middleware, si no se ejecuta correctamente, se lanza un error.
        
        check('role').custom( isRoleValid ),
        validarCampos // Importamos el middleware de validar campos
],userPost );


// PUT ************************
router.put('/:id',[
        // isMongoId() es un metodo de express-validator, que valida si el id es un id de mongo
        check('id', 'This is not a valid ID').isMongoId(), 
        check('id').custom( existeUsuarioPorId ),
        check('role').custom( isRoleValid ),
        validarCampos // Importamos el middleware de validar campos
]
,userPut); // router es un objeto, y el metodo put es un metodo del objeto
// PATCH
router.patch('/:id', userPatch);
// DELETE
router.delete('/:id', userDelete);

module.exports = router;