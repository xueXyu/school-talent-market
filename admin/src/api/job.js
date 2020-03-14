import request from '@/utils/request'

export function jobList(params) {
  return request({
    url: '/company-job',
    method: 'get',
    params: params
  })
}

export function updateJob(id, data) {
  return request({
    url: '/company-job/' + id,
    method: 'put',
    data
  })
}

export function deleteJob(id) {
  return request({
    url: '/company-job/' + id,
    method: 'delete'
  })
}
