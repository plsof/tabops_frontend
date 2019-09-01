import request from '@/utils/request'

export function fetchTms(query) {
  return request({
    url: '/architecture/tms',
    method: 'get',
    params: query
  })
}

export function createTms(data) {
  return request({
    url: '/architecture/tms/',
    method: 'post',
    data
  })
}

export function updateTms(data) {
  return request({
    url: '/architecture/tms/' + data.id,
    method: 'put',
    data
  })
}

export function deleteTms(id) {
  return request({
    url: '/architecture/tms/' + id,
    method: 'delete'
  })
}
