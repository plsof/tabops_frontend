import request from '@/utils/request'

export function fetchTOS(query) {
  return request({
    url: '/architecture/tos',
    method: 'get',
    params: query
  })
}

export function createTOS(data) {
  return request({
    url: '/architecture/tos/',
    method: 'post',
    data
  })
}

export function updateTOS(data) {
  return request({
    url: '/architecture/tos/' + data.id,
    method: 'put',
    data
  })
}

export function deleteTOS(id) {
  return request({
    url: '/architecture/tos/' + id,
    method: 'delete'
  })
}
