const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = process.env.port || 5000

app.use(cors())
app.use(express.json());

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


// app.get('/', (req, res) => {
//   res.send('Hello World! This is Harsh Kesarwani')
// })
// app.get('/welcome', (req, res) => {
//   res.send('I welcome you all from the depth of my heart')
// })

if(process.env.NODE_ENV == "production") {
  app.use(express.static("../build"));
}

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})
