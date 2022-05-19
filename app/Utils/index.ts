import { SongPayload } from 'App/Types'
import CustomException from 'App/Exceptions/CustomException'

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
          artist: 'Artist',
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

export const errorHandler = (error: any) => {
  // console.log(error.response)
  throw new CustomException(
    error?.response?.statusText ?? error.message ?? 'Unknown',
    error?.response?.status ?? error.status ?? 400
  )
}
