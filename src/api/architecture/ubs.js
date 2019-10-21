import request from '@/utils/request'

export function fetchUBS(query) {
  return request({
    url: '/architecture/ubs',
    method: 'get',
    params: query
  })
}

export function createUBS(data) {
  return request({
    url: '/architecture/ubs/',
    method: 'post',
    data
  })
}

export function updateUBS(data) {
  return request({
    url: '/architecture/ubs/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteUBS(id) {
  return request({
    url: '/architecture/ubs/' + id,
    method: 'delete'
  })
}
