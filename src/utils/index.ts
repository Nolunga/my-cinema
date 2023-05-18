export const API_HOST = import.meta.env.VITE_APP_API_HOST

export const STRONG_PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=.{8,})/g
export const MEDIUM_PASSWORD_REGEX =
  /((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/g

export const returnImgUrl = (url: string) => {
  if (!url) {
    return ''
  }
  return 'https://image.tmdb.org/t/p/w500' + url
}
