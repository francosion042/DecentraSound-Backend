import { DateTime } from 'luxon'

export interface SongPayload {
  title: string
  tokenId: string
  blockchain?: string
  imageUrl: string
  audioUrl: string
  contractAddress: string
  artistId?: number
  albumId?: number
  openseaPermalink?: string
  rariblePermalink?: string
}

export interface AlbumPayload {
  name: string
  description?: string
  contractAddress: string
  blockchain?: string
  contractType: string
  totalSongs?: number
  artistId?: number
  genreId?: number
  marketPlace: string
  openseaIdentifier?: string
  raribleIdentifier?: string
  coverImageUrl?: string
  releaseDate: DateTime
}
