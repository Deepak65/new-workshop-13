const express = require('express')
const jwt = require('jsonwebtoken')
const authorize = require('./authorization-middleware')
const config = require('./config')
const app = express()
const port = process.env.PORT || 5000

// DISCLAIMER: User sholud be authenticate !!!
app.get('/token', (req, res)=> {
const payload = {
    name:"Deepak",
    scopes:['customer:create', 'customer:read']
}
const token = jwt.sign(payload, config.JWT_SECRET)
res.send(token) 

})
app.get('/customer', authorize('customer:read'), (req, res)=>{
    res.send('customer information')
})

const server = app.listen(port, ()=> {
    console.log(`server is listening ${server.address().port}`)
})

