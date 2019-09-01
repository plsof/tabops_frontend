import request from '@/utils/request'

export function fetchRack(query) {
  return request({
    url: '/rack/list',
    method: 'get',
    params: query
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
