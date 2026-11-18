import connectToDatabase from './utils/db.js'
import config from './utils/config.js'
import app from './app.js'

const main = async () => {
  await connectToDatabase()
  app.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`)
  })
}

main()
