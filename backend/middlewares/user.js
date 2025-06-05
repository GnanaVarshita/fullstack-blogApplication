const jwt = require('jsonwebtoken')
const secret = 'Gv_SERVER'
function userMiddleware(req, res, next) {
    
const token = req.headers.authorization 
const key = token.split(" ")[1]
//verify
const decodedValue=jwt.verify(key,secret)
if(decodedValue.username){
    next()
}else{
    res.status(401).json({
        message: "Unauthorized User"
    })
}
}

module.exports = userMiddleware;