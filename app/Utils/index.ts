import { SongPayload, AlbumPayload } from 'App/Types'
import CustomException from 'App/Exceptions/CustomException'
import { DateTime } from 'luxon'

export const extractRaribleMusicAssets = (data) => {
  const musicAssets: SongPayload[] = []

  for (const item of data?.items) {
    let itemImageUrl = ''
    for (const itemContent of item.meta.content) {
      if (itemContent['@type'] === 'IMAGE' && itemContent['mimeType'] === 'image/gif') {
        itemImageUrl = itemContent.url
      } else if (itemContent['@type'] === 'VIDEO' && itemContent['mimeType'] === 'audio/wav') {
        musicAssets.push({
          title: item.meta.name,
          tokenId: item.tokenId,
          blockchain: item.blockchain,
          imageUrl: itemImageUrl,
          audioUrl: itemContent.url,
          contractAddress: item.contract.split(':')[1],
        })
      }
    }
  }

  return musicAssets
}

export const extractOpenSeaMusicAssets = (assets, albumId, artistId) => {
  const musicAssets: SongPayload[] = []

  for (const asset of assets) {
    if (asset.animation_url && asset.animation_url.endsWith('mp3')) {
      musicAssets.push({
        title: asset.name,
        tokenId: asset.token_id,
        imageUrl: asset.image_url,
        audioUrl: asset.animation_url,
        albumId: albumId,
        artistId: artistId,
        contractAddress: asset.asset_contract.address,
        openseaPermalink: asset.permalink,
      })
    }
  }

  return musicAssets
}

export const extractOpenSeaAlbum = ({ collection }) => {
  const album: AlbumPayload = {
    name: collection.name,
    description: collection.description,
    contractAddress: collection.primary_asset_contracts[0]?.address,
    contractType: collection.primary_asset_contracts[0]?.schema_name,
    marketPlace: 'OpenSea',
    openseaIdentifier: collection.slug,
    coverImageUrl: collection.image_url,
    releaseDate: DateTime.fromJSDate(new Date(collection.created_date)),
  }

  return album
}

export const errorHandler = (error: any) => {
  // console.log(error.response)
  throw new CustomException(
    error?.response?.statusText ?? error.message ?? 'Unknown',
    error?.response?.status ?? error.status ?? 400
  )
}
