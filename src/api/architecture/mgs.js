import request from '@/utils/request'

export function fetchMGS(query) {
  return request({
    url: '/architecture/mgs',
    method: 'get',
    params: query
  })
}

export function createMGS(data) {
  return request({
    url: '/architecture/mgs/',
    method: 'post',
    data
  })
}

export function updateMGS(data) {
  return request({
    url: '/architecture/mgs/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteMGS(id) {
  return request({
    url: '/architecture/mgs/' + id,
    method: 'delete'
  })
}
