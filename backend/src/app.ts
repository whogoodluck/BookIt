import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import router from './routes'

import unknownEndpoint from './middlewares/unknown-endpoint'

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

router.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use('/api', router)

app.use(unknownEndpoint)

export default app
