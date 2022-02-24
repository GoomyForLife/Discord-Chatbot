const express = require('express')
const server = express();



server.all('/', (req, res)=>{
    res.send(`BOT IS ONLINE AND NOW READY TO GO! `)
})
function keepAlive(){
    server.listen(2000, ()=>{console.log("Server is Ready!")});
}
module.exports = keepAlive;
