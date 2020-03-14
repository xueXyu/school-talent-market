import request from '@/utils/request'

export function companyList(params) {
  return request({
    url: '/company',
    method: 'get',
    params: params
  })
}

export function createCompany(data) {
  return request({
    url: '/company',
    method: 'post',
    data
  })
}

export function updateCompany(id, data) {
  return request({
    url: '/company/' + id,
    method: 'put',
    data
  })
}

export function deleteCompany(id) {
  return request({
    url: '/company/' + id,
    method: 'delete'
  })
}
