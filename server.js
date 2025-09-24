const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const PORT = 8000
require('dotenv').config()

app.use(cors());

let db,
    dbConnectionStr = process.env.DB_STRING
    dbName = 'rap'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to {dbName} Database`)
        db = client.db(dbName)
    })
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const rappers = {
    '21 savage': {
        'age': 32,
        'birthName': 'Shéyaa Bin Abraham-Joseph',
        'birthLocation': 'London, England',
    },
    'chance the rapper': {
        'age': 32,
        'birthName': 'Chancelor Johnathan Bennett',
        'birthLocation': 'Chicago, Illinois',
    },
    'dylan': {
        'age': 32,
        'birthName': 'Dylan',
        'birthLocation': 'Dylan',
    },
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')

})

app.get('/api:rapperName', (request, response) => {
    const rappersName = request.params.rapperName.toLowerCase()
    if (rappers[rappersName]){
        response.json(rappers[rappersName])
    }else{
        response.json(rappers['dylan'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
})