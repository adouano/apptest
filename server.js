const express = require('express')
const server = express()
const port = 5173

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example server listening on port ${port}`)
})