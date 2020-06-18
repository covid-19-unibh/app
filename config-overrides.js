/**
 * Overrides CRA's default Webpack config.
 */
require('dotenv').config()
const { DefinePlugin } = require('webpack')
const { override, addWebpackPlugin } = require('customize-cra')

module.exports = override(
  /**
   * Inject environment variables into our client
   * application.
   */
  addWebpackPlugin(
    new DefinePlugin({
      'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY),
      'process.env.FIREB_APP_NICKNAME': JSON.stringify(
        process.env.FIREB_APP_NICKNAME
      ),
      'process.env.FIREB_MSG_SENDER_ID': JSON.stringify(
        process.env.FIREB_MSG_SENDER_ID
      ),
      'process.env.FIREB_APP_ID': JSON.stringify(process.env.FIREB_APP_ID),
      'process.env.ROLLB_TOKEN': JSON.stringify(process.env.ROLLB_TOKEN),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    })
  )
)
