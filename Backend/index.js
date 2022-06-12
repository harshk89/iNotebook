const connectToMongo = require('./db');
connectToMongo();
const express = require('express')

const app = express()
const port = 5000

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
