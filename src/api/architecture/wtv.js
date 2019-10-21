import request from '@/utils/request'

export function fetchWtv(query) {
  return request({
    url: '/architecture/wtv',
    method: 'get',
    params: query
  })
}

export function createWtv(data) {
  return request({
    url: '/architecture/wtv/',
    method: 'post',
    data
  })
}

export function updateWtv(data) {
  return request({
    url: '/architecture/wtv/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteWtv(id) {
  return request({
    url: '/architecture/wtv/' + id,
    method: 'delete'
  })
}
