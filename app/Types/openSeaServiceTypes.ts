export interface GetAssetsByCollectionRequestBody {
  collection_slug?: string
  asset_contract_address?: string
  cursor?: string
}

export interface GetACollectionRequestBody {
  collection_slug: string
}
