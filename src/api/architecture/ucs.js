import request from '@/utils/request'

export function fetchUCS(query) {
  return request({
    url: '/architecture/ucs',
    method: 'get',
    params: query
  })
}

export function createUCS(data) {
  return request({
    url: '/architecture/ucs/',
    method: 'post',
    data
  })
}

export function updateUCS(data) {
  return request({
    url: '/architecture/ucs/' + data.id,
    method: 'put',
    data
  })
}

export function deleteUCS(id) {
  return request({
    url: '/architecture/ucs/' + id,
    method: 'delete'
  })
}
