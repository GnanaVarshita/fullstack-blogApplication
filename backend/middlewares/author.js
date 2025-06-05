const jwt = require('jsonwebtoken')
const secret = 'Gv_SERVER'
function authorMiddleware(req, res, next) {
    
const token = req.headers.authorization 
console.log(token)
const key = token.split(" ")[1]
//verify
const decodedValue=jwt.verify(key,secret)
if(decodedValue.email){
    console.log("User is authorized")
    next()
}else{
    res.status(401).json({
        message: "Unauthorized User"
    })
}
}

module.exports = authorMiddleware;