const {response,request} = require('express');
const userGet = (req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    });
}

const userPost = (req, res) => {
    res.json({       
        msg: `post API`
    })
}
const userPut = (req, res) => { 
    res.json({
        msg: `put API`
    })
};

const userDelete = (req, res) => {
        res.json({
        msg: `delete API`
    })
}
const userPatch = (req, res) => {   
    res.json({
        msg: `patch API`
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,    
    userPatch

};