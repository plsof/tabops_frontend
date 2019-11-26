import request from '@/utils/request'

export function fetchVAS(query) {
  return request({
    url: '/architecture/vas',
    method: 'get',
    params: query
  })
}

export function createVAS(data) {
  return request({
    url: '/architecture/vas/',
    method: 'post',
    data
  })
}

export function updateVAS(data) {
  return request({
    url: '/architecture/vas/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteVAS(id) {
  return request({
    url: '/architecture/vas/' + id,
    method: 'delete'
  })
}
