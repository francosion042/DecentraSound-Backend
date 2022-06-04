export interface GetAssetsByOwnerRequestBody {
  blockchains?: string
  address: string
  size?: number
}

export interface GetAssetsByCollectionRequestBody {
  blockchains?: string
  address: string
  continuation?: string
  size?: number
}

export interface GetCollectionByIdRequestBody {
  blockchain: string
  address: string
}
