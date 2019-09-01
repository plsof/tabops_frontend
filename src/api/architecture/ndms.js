import request from '@/utils/request'

export function fetchNDms(query) {
  return request({
    url: '/architecture/ndms',
    method: 'get',
    params: query
  })
}

export function createNDms(data) {
  return request({
    url: '/architecture/ndms/',
    method: 'post',
    data
  })
}

export function updateNDms(data) {
  return request({
    url: '/architecture/ndms/' + data.id,
    method: 'put',
    data
  })
}

export function deleteNDms(id) {
  return request({
    url: '/architecture/ndms/' + id,
    method: 'delete'
  })
}
