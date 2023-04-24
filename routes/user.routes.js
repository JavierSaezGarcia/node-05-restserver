
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
router.put('/', userPut);
// PATCH
router.patch('/', userPatch);
// DELETE
router.delete('/', userDelete);

module.exports = router;