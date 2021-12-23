const express = require('express')
const bodyParser= require ('body-parser') 
const path = require('path')


const app = express()
const port = 5000
var urlParser = bodyParser.urlencoded({extended: false})


app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.use(express.static(__dirname + '/public'));

app.post('/profile', urlParser, function(req,res){
    res.sendFile(__dirname + '/profile.html')
})



app.listen(port, function(err){
    if(err){
        console.log("There is an error: ". err)
    } else{
        console.log("Server is running on port", port)
    }
})
