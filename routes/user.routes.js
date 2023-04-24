
const { Router } = require('express');
const { userGet, 
        userPost,
        userPut,
        userPatch,
        userDelete
        } = require('../controllers/user.controller');

const router = Router();

// GET
router.get('/', userGet);
// POST
router.post('/', userPost );
// PUT
router.put('/:id', userPut);
// PATCH
router.patch('/:id', userPatch);
// DELETE
router.delete('/:id', userDelete);

module.exports = router;