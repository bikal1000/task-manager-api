require('dotenv').config();
const express = require('express')
require('./db/mongoose')
const userRouters = require('./routers/user')
const taskRouters = require('./routers/task')

const app = express()
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use('/api', userRouters)
app.use('/api', taskRouters)

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})