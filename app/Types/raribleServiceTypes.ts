export interface GetAssetsByOwnerRequestBody {
  blockchains?: string
  address: string
  size?: number
}

export interface GetAssetsByCollectionRequestBody {
  blockchain: string
  address: string
  continuation?: string
}

export interface GetAssetsByTokenIdsRequestBody {
  address: string
  tokenIds: object[]
}

export interface GetCollectionByIdRequestBody {
  blockchain: string
  address: string
}
