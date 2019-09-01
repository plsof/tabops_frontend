import request from '@/utils/request'

export function fetchBimsBoot(query) {
  return request({
    url: '/architecture/bimsboot',
    method: 'get',
    params: query
  })
}

export function createBimsBoot(data) {
  return request({
    url: '/architecture/bimsboot/',
    method: 'post',
    data
  })
}

export function updateBimsBoot(data) {
  return request({
    url: '/architecture/bimsboot/' + data.id,
    method: 'put',
    data
  })
}

export function deleteBimsBoot(id) {
  return request({
    url: '/architecture/bimsboot/' + id,
    method: 'delete'
  })
}
