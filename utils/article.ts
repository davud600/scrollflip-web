import { CustomArticle } from '@/types/article.types'
import cheerio from 'cheerio'

export function extractValuesFromDescriptionCustomArticles(
  customArticle: CustomArticle
) {
  return {
    imgSrc: customArticle.thumbnailLink,
    h1Content: customArticle.title,
    anchorHref: '',
  }
}

/** Function to extract imgSrc, h1 content, and anchor href  */
export function extractValuesFromDescription(description: string) {
  const $ = cheerio.load(description)

  const imgSrc = $('img').attr('src')
  const h1Content = $('h1').text()
  const anchorHref = $('a').attr('href')

  return {
    imgSrc,
    h1Content,
    anchorHref,
  }
}

export function getTimeSinceArticleCreated(articleDate: Date) {
  if (!(articleDate instanceof Date)) {
    throw new Error('Invalid article date. Please provide a valid Date object.')
  }

  const now = new Date()
  const elapsedMilliseconds = now.getTime() - articleDate.getTime()
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000)
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  const elapsedHours = Math.floor(elapsedMinutes / 60)
  const elapsedDays = Math.floor(elapsedHours / 24)

  if (elapsedDays > 0) {
    return `${elapsedDays} day${elapsedDays > 1 ? 's' : ''} ago`
  } else if (elapsedHours > 0) {
    return `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`
  } else {
    return `${elapsedSeconds} second${elapsedSeconds > 1 ? 's' : ''} ago`
  }
}
