import request from '@/utils/request'

export function fetchSearch(query) {
  return request({
    url: '/architecture/search',
    method: 'get',
    params: query
  })
}

export function createSearch(data) {
  return request({
    url: '/architecture/search/',
    method: 'post',
    data
  })
}

export function updateSearch(data) {
  return request({
    url: '/architecture/search/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteSearch(id) {
  return request({
    url: '/architecture/search/' + id,
    method: 'delete'
  })
}
