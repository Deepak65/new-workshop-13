const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = (credentials = []) =>{
    return (req, res, next) => {
    console.log('Authorization middleware')
    //Allow for a string or array
    if(typeof credentials === 'string'){
        credentials = [credentials]
    }

    //Find jwt in headers
    const token = req.headers['authorization']
    if(!token){
        return res.status(401).send("sorry :access denied")
    } else{
//validate
//bearer 
        const tokenBody = token.slice(7)

        jwt.verify(tokenBody,  config.JWT_SECRET, (err, decoded) => {
            if(err){
                console.log('JWT ERR: ${err}')
                return res.status(401).send('error: access denied')
            }
            //no error jwt is good
            //check for credentials
            if(credentials.length > 0) {
                if(decoded.scopes && decoded.scopes.length && 
                    credentials.some(cred => decoded.scopes.indexOf(cred)>= 0)
                    ){
                   next() 
                } else {
                    return res.status(401).send('error: access denied')
                }
            } else{
                //no credentilas required user is authenticate 
                next()
            }
            
        })
               
    }   
  }
}