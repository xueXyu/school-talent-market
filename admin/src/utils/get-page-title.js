import defaultSettings from '@/settings'

const title = defaultSettings.title || '校园人才网后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
