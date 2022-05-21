import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import messages from './messages'

export class Store {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    artistId: schema.number(),
    platform: schema.string.optional(),
    position: schema.number(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = { ...messages }
}

export class Update {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    artistId: schema.number.optional(),
    platform: schema.string.optional(),
    position: schema.number.optional(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = { ...messages }
}
