/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

const isDev = () => process.env.NODE_ENV === 'development'
const isProd = () => process.env.NODE_ENV === 'production'

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: isDev()
    ? Env.schema.string({ format: 'host' })
    : Env.schema.string.optional({ format: 'host' }),
  PORT: isDev() ? Env.schema.number() : Env.schema.number.optional(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string.optional(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  DB_CONNECTION: Env.schema.string(),
  DATABASE_URL: isProd() ? Env.schema.string() : Env.schema.string.optional(),
  PG_HOST: isDev()
    ? Env.schema.string({ format: 'host' })
    : Env.schema.string.optional({ format: 'host' }),
  PG_PORT: isDev() ? Env.schema.number() : Env.schema.number.optional(),
  PG_USER: isDev() ? Env.schema.string() : Env.schema.string.optional(),
  PG_PASSWORD: isDev() ? Env.schema.string() : Env.schema.string.optional(),
  PG_DB_NAME: isDev() ? Env.schema.string() : Env.schema.string.optional(),

  OPENSEA_API_BASE_URL: Env.schema.string(),
  OPENSEA_API_KEY: Env.schema.string(),
  RARIBLE_API_BASE_URL: Env.schema.string(),
})
