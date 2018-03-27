const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', (req, res) => res.send('Posting World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
