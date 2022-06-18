import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import messages from './messages'

export class Store {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    genreId: schema.number(),
    marketPlace: schema.enum.optional(['OpenSea', 'Rarible']),
    openseaSlug: schema.string.optional({ trim: true }),
    contractAddress: schema.string.optional({ trim: true }),
    contractType: schema.enum.optional(['ERC721', 'ERC1155']),
    blockchain: schema.string.optional(),
    numOfTokensToUpload: schema.number.optional(),
    tokensToUpload: schema.array.optional().members(
      schema.object().members({
        tokenBlockchain: schema.string.optional(),
        tokenContractAddress: schema.string.optional(),
        tokenId: schema.string(),
      })
    ),
    marketPlaceCollectionUrl: schema.string.optional(),
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
    genreId: schema.number.optional(),
    marketPlace: schema.enum.optional(['OpenSea', 'Rarible']),
    openseaSlug: schema.string.optional({ trim: true }),
    contractAddress: schema.string.optional({ trim: true }),
    contractType: schema.enum.optional(['ERC721', 'ERC1155']),
    blockchain: schema.string.optional(),
    numOfTokensToUpload: schema.number.optional(),
    tokensToUpload: schema.array.optional().members(
      schema.object().members({
        tokenBlockchain: schema.string.optional(),
        tokenContractAddress: schema.string.optional(),
        tokenId: schema.string(),
      })
    ),
    marketPlaceCollectionUrl: schema.string.optional(),
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
