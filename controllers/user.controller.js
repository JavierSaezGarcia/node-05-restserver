const { response,request } = require('express');

const userGet = (req= request, res=response	) => {
    const { q,nombre='No nombre',apikey} = req.query;
    res.json({
        msg: `Get API - controller con params: ${q} ${nombre} ${apikey}`,
        q,
        nombre,
        apikey
    });
}

const userPost = (req=request, res=response) => {
    const {nombre,edad} = req.body;
    res.json({       
        msg: 'Post API - controller',
        nombre, 
        edad
    })
}
const userPut = (req, res) => { 
    const id = req.params.id;
    res.json({
        msg: `put API`,
        id
    })
};
const userPatch = (req, res) => {   
    const {id} = req.params;
    res.json({
        msg: `patch API`,
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