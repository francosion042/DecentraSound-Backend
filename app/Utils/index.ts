import { SongPayload } from 'App/Types'

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
