import request from '@/utils/request'

export function fetchCosEpg(query) {
  return request({
    url: '/architecture/cosepg',
    method: 'get',
    params: query
  })
}

export function createCosEpg(data) {
  return request({
    url: '/architecture/cosepg/',
    method: 'post',
    data
  })
}

export function updateCosEpg(data) {
  return request({
    url: '/architecture/cosepg/' + data.id,
    method: 'put',
    data
  })
}

export function deleteCosEpg(id) {
  return request({
    url: '/architecture/cosepg/' + id,
    method: 'delete'
  })
}
