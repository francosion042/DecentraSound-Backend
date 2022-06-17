export interface GetAssetsByCollectionRequestBody {
  collection_slug?: string
  asset_contract_address?: string
  cursor?: string
}

export interface GetAssetsByTokenIdsRequestBody {
  tokenIds?: { tokenBlockchain?: string; tokenContractAddress?: string; tokenId: string }[]
  collection_slug?: string
  asset_contract_address?: string
  cursor?: string
}

export interface GetACollectionRequestBody {
  collection_slug: string
}
