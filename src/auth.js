const Admin = require('./models/admin');
const jwt = require('jsonwebtoken');
const secret = "mysecret"

module.exports = {

    async login(req, res) {
        const { password } = req.body;
        Admin.findOne({password: password}, function(err, admin) {
            if(err){
                res.status(500).json( { message: err.message });
            } else if (!admin) {
                res.status(200).json({status:2, message: 'Cannot find admin'})
            } else {
                const payload = { password };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '2h'
                })
                res.cookie('token', token, {httpOnly: true})
                res.status(200).json({status:1, auth:true, token: token, id: admin._id});
            }
        })
    }, 

    async checkToken(req, res){
        const token = req.body.token || req.query.token || req.cookies.token || req.params.token || req.headers['x-access-token'];
        if(!token){
            res.json({status:401, msg:'Não autorizado: Token inexistente!'});
        }else{
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.send(401).json({status:401 ,msg:'Não autorizado: Token inválido!'});
                }else{
                    res.send(200).json({status:200});
                }
            })
        }
    },

}