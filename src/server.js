import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const logger = (req, res, next) => {
  const { headers, body } = req
  console.log('logging\n')
  console.log(headers)
  console.log(body)
  next()
}

app.get('/', logger, (req, res) => {
  res.send({ message: 'Hello world route!' })
})

app.post('/', logger, (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on port 3000')
  })
}
