import request from '@/utils/request'

export function fetchHost(query) {
  return request({
    url: '/asset/host',
    method: 'get',
    params: query
  })
}

export function createHost(data) {
  return request({
    url: '/asset/host/',
    method: 'post',
    data
  })
}

export function updateHost(data) {
  return request({
    url: '/asset/host/' + data.id,
    method: 'put',
    data
  })
}

export function deleteHost(id) {
  return request({
    url: '/asset/host/' + id,
    method: 'delete'
  })
}
