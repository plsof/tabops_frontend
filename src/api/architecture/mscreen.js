import request from '@/utils/request'

export function fetchMScreen(query) {
  return request({
    url: '/architecture/mscreen',
    method: 'get',
    params: query
  })
}

export function createMScreen(data) {
  return request({
    url: '/architecture/mscreen/',
    method: 'post',
    data
  })
}

export function updateMScreen(data) {
  return request({
    url: '/architecture/mscreen/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteMScreen(id) {
  return request({
    url: '/architecture/mscreen/' + id,
    method: 'delete'
  })
}
