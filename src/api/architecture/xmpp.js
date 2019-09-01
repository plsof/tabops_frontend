import request from '@/utils/request'

export function fetchXMpp(query) {
  return request({
    url: '/architecture/xmpp',
    method: 'get',
    params: query
  })
}

export function createXMpp(data) {
  return request({
    url: '/architecture/xmpp/',
    method: 'post',
    data
  })
}

export function updateXMpp(data) {
  return request({
    url: '/architecture/xmpp/' + data.id,
    method: 'put',
    data
  })
}

export function deleteXMpp(id) {
  return request({
    url: '/architecture/xmpp/' + id,
    method: 'delete'
  })
}
