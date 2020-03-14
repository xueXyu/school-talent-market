import request from '@/utils/request'

export function newsList(params) {
  return request({
    url: '/news',
    method: 'get',
    params: params
  })
}

export function createNews(data) {
  return request({
    url: '/news',
    method: 'post',
    data
  })
}

export function updateNews(id, data) {
  return request({
    url: '/news/' + id,
    method: 'put',
    data
  })
}

export function deleteNews(id) {
  return request({
    url: '/news/' + id,
    method: 'delete'
  })
}

export function siteCount() {
  return request({
    url: '/news/home-statistics',
    method: 'get'
  })
}

export function siteDailyIncrease() {
  return request({
    url: '/news/daily-increase',
    method: 'get'
  })
}

