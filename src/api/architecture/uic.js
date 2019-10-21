import request from '@/utils/request'

export function fetchUic(query) {
  return request({
    url: '/architecture/uic',
    method: 'get',
    params: query
  })
}

export function createUic(data) {
  return request({
    url: '/architecture/uic/',
    method: 'post',
    data
  })
}

export function updateUic(data) {
  return request({
    url: '/architecture/uic/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteUic(id) {
  return request({
    url: '/architecture/uic/' + id,
    method: 'delete'
  })
}
