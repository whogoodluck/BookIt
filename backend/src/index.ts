import app from './app'
import { connectDB } from './config/mongoose'
import config from './utils/config'
import logger from './utils/logger'

app.listen(config.PORT, async () => {
  logger.info(`🚀 Server running at http://localhost:${config.PORT}`)
  await connectDB()
})
