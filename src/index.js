if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
require('./db/mongoose')
const userRouters = require('./routers/user')
const taskRouters = require('./routers/task')

const app = express()
const PORT = process.env.PORT || 4000;

app.use(express.json())
app.use(userRouters)
app.use(taskRouters)

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`)
})