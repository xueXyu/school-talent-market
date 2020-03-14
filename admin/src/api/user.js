import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function userList(params) {
  return request({
    url: '/user',
    method: 'get',
    params: params
  })
}

export function createUser(data) {
  return request({
    url: '/user/create',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: '/user/' + id,
    method: 'put',
    data
  })
}
//
// export function deleteUser(params) {
//   return request({
//     url: '/user',
//     method: 'delete',
//     params: params
//   })
// }
