/**
 * Image Types
 */
export enum ImageTypes {
  JPEG = 'image/jpeg',
  GIF = 'image/gif',
  PNG = 'image/png',
  PDF = 'application/pdf',
  HEIC = 'image/heic',
}

/**
 * Base64 symbols for Image Types
 */
export enum ImageTypesSymbols {
  '/' = ImageTypes.JPEG,
  'R' = ImageTypes.GIF,
  'i' = ImageTypes.PNG,
  'J' = ImageTypes.PDF,
  'A' = ImageTypes.HEIC,
}

/**
 * Field names
 */
export enum ImageFields {
  IMG = 'img',
  HEIGHT = 'height',
  WIDTH = 'width',
}