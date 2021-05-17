import {connect} from 'skyflow-node'
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import mysql from 'mysql'
import axios from 'axios'
import { cachedDataVersionTag } from 'v8'
import os from 'os'


const con = mysql.createConnection({
    host: "database-1-instance-1.chjkbqorexj6.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "BostonKid26",
})


const credentials = {"clientID":"d7fcc8c7932c11eb95ecfa32c18f2471","clientName":"evis-test5","tokenURI":"https://manage.skyflowapis.com/v1/auth/sa/oauth/token","keyID":"e82eebac994411ebbdd2c66f51ca7382","privateKey":"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDfQJTcgIc4odoU\nXgb7HsITBd54YFb95VqcJcvUX1ZXCJrTn9rJ8TRO9safnXOfkDcXgcks2u8YXcko\nFNGfzBdlouo352QqTIPi4wXqRdMbleuZ2SsXstNrM+2/YhZyW7CFCTc3OoDwmKcU\na1EAiOHM9X7CFv8+y0TPl8CoY7D+eQgDxAfEVT0FGo3KypOpxZe3CP9leMk1lSIz\n1AVRSNNLE9/GVFlJhMYONLdt/R+dPyKdvfr90aFKeaDsp8b6nc5wlwz55t6epbKB\nHSNNRQx5k8oxEcqgity+6S/laBVs9gGfZ7/NLgsz4pbx3b1hCZ1IRYWCIo5XMxCK\nxJaNadLrAgMBAAECggEAYPn4r9/U3TDRPk+p0KOHwiOmg7u1jgx206VHaTUQmDXQ\nq2Sg8V+pTTO9C9ClTQakJ73k2WswuPDkVFjWxgctkqS2ARquVAFwuLnM8/rovO7e\nrLG9Gko/tC2WdK/y+DID94YNShxLrjdhPGlxgj3zd8icC0taDLjXZyWQNpU3aRHy\nSk945fSTgBrDZLtzIDL1VtGbzULDw4cTIdTgRtnSShvOQ+8ism2AMEQPTztYtCD8\nNWzhAB/eyiRllbLmBiA2EWsEwLsocvCOLrpInFcNWmQML5MpRC+l1FH4VP7OH4fQ\n4+kshRubD442Y+BB0DriQQ/YN/ffLcwQ3Uf7eqHwoQKBgQDtdBhK9pQXn2oz3DXy\nq1CARPw/zrhAYCBV08GTT9viCRhm+UsfHJnYZCGqz4F4XDtEyX6iDcv+4oVfsoA3\nUQo0wf2znUua02KS/shNk7rKtg7culiEomD93V/Q92MGU82NqpP1OdXNaOEqYU2I\nYodFEtbbXsK01M15JfqY1EIvtwKBgQDwsIgiVbVoHaf5iUyCh8Xd6cSj+VLHuaAw\nwo70iz6aPxX6gwhgU2dvCIerJWtcAk3IQuHNlHhRNAU8NV28HMTgtWM6+BtFrnoc\nh6/POf4jP374JnrkvDjQ7MLYaRTkz/Dyd08FeWi21x23E4HNwVqA0c/YN7uU08Ss\nNVYyN1yObQKBgAxZDSpYyDqyP4OS3/tOjVEeRT/MMCio1wWfjWFrtbN7ZZl1PULQ\n6e8mxdlsEP+BTFO3Zq5mqUUH4oencKNvw2ga7mZ4t4XFmEqslR3zoLMJ5Jv11MSQ\n7RpGeMUVGEEr+nRzel42M7gKzCq4BKAi/4XIBQRDWTyuFEFIiE+KOibhAoGAani9\nD+s4P2F3EATzin6DQiKKMTs2qlFsEoXOdVEvlU4468ORLgNXKx/r3ALGlkISpHcp\nqiZ2fv1zH2pAF9nmIb07szdT4SRIslw3ooT17iPFiAKFtK+qtok1vEPn0TxHSwsK\nMtK9RrysUXNYpWtWHMwzlGM7IJ/5TXCeu8IPuJUCgYBTcxFR4XHUZzx9tsPtfquy\nehzqZce4LITOyv8C+zN+0BSPGFdf47uzDwZWbSdTJ/pMl1SQ6tfyO5tX9yg6+SQc\nqzxHd4OKdp1XqCctnQRWp1E+/Ny2OmpOL8rmYZB1KvBDHJaaQxqV1Xy6Ba3vAr6F\nvIrn9dsPPSDYSUf3jGTPLA==\n-----END PRIVATE KEY-----\n"}
const vaultId = "b9c4eccf931d11eba1461ed5de749338"
const workspaceURL  = 'sb1.try.vault.skyflowapis.com'

//creates a new client object that connects to your vault and authenticates with the service account
const client = connect(workspaceURL, vaultId, credentials)

if(client){
    console.log("Skyflow client is connected")
}else{
    console.log("Skyflow client is not connected")
}

const app = express()
const port = 5000
var urlParser = bodyParser.urlencoded({extended: false})

const __dirname = path.resolve(path.dirname(''));



//aws rds connection




app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.get('/tokenview', function (req, res) {
    res.sendFile(__dirname + '/tokenview.html')
  })
  

app.post('/createrecord', urlParser, function(req,res){
    console.log(req.body)
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var ccn = req.body.ccn
    var exp_date = req.body.exp_date
    var cvv = req.body.cvv

    const record = {
        "records":[
            {
                "fields": {
                    "first_name": first_name,
                    "last_name": last_name,
                    "primary_card": {
                        "card_number": ccn,
                        "cvv":cvv,
                        "expiry_date": exp_date
                    }
                }
            }
         ]}

    console.log(record)
    client.insertRecords('pii_fields', record)
    .then(res => {
        console.log(res)
        var token = res.records[0].skyflow_id
        console.log(token)
        con.connect(function(err){
            con.query(`INSERT INTO main.users (token) VALUES ('${token}')`, function(err, result, fields) {
                if(err) throw err
                if(result) console.log(result)
            })
        })
    })
    // .catch(err => console.log(err.data.error))
    res.redirect('/tokenview')

})

var apiurl = express.Router();
apiurl.use(function(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('hostName') + req.originalUrl;
    console.log(fullUrl)
    next();
});
app.use('/', apiurl);




app.get('/get_users', function(req,res){
    con.connect(function(err){
        var query = `Select * from main.users`
        con.query(query, function(err, result){
            if(err) console.log(err)
            if(result) console.log(result)
        })

    })
})



app.listen(port, function(err){
    if(err){
        console.log("There is an error: ". err)
    } else{
        console.log("Server is running on port", port)
    }
})
    
