import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

const prefex = '/api/v1'


app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})