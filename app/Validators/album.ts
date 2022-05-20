import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import messages from './messages'

export class Store {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    marketPlace: schema.enum.optional(['OpenSea', 'Rarible']),
    openseaSlug: schema.string.optional({ trim: true }),
    contractAddress: schema.string.optional({ trim: true }),
    blockchain: schema.string.optional(),
    rarible: schema.string.optional({ trim: true }),
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
    name: schema.string.optional({ trim: true }),
    description: schema.string.optional(),
    contractAddress: schema.string.optional(),
    blockchain: schema.string.optional(),
    openseaPermalink: schema.string.optional(),
    rariblePermalink: schema.string.optional(),
    coverImageUrl: schema.string.optional(),
    totalSongs: schema.number.optional(),
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
