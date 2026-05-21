const serverless = require('serverless-http')
const dotenv = require('dotenv')
const path = require('path')
const connectDB = require('../../server/config/db')
const createApp = require('../../server/app')

// Load local env when running via netlify dev / locally.
dotenv.config({ path: path.join(__dirname, '..', '..', 'server', '.env') })

const app = createApp()

// Netlify rewrites to `/.netlify/functions/<name>/...`
// We use `basePath` so Express receives clean URLs.
const handler = serverless(app, { basePath: '/.netlify/functions/api' })

let dbReady = false

module.exports.handler = async (event, context) => {
  if (!dbReady) {
    await connectDB()
    dbReady = true
  }

  return handler(event, context)
}

