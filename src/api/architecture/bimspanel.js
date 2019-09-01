import request from '@/utils/request'

export function fetchBimsPanel(query) {
  return request({
    url: '/architecture/bimspanel',
    method: 'get',
    params: query
  })
}

export function createBimsPanel(data) {
  return request({
    url: '/architecture/bimspanel/',
    method: 'post',
    data
  })
}

export function updateBimsPanel(data) {
  return request({
    url: '/architecture/bimspanel/' + data.id,
    method: 'put',
    data
  })
}

export function deleteBimsPanel(id) {
  return request({
    url: '/architecture/bimspanel/' + id,
    method: 'delete'
  })
}
