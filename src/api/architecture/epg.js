import request from '@/utils/request'

export function fetchEpg(query) {
  return request({
    url: '/architecture/epg',
    method: 'get',
    params: query
  })
}

export function createEpg(data) {
  return request({
    url: '/architecture/epg/',
    method: 'post',
    data
  })
}

export function updateEpg(data) {
  return request({
    url: '/architecture/epg/' + data.id,
    method: 'put',
    data
  })
}

export function deleteEpg(id) {
  return request({
    url: '/architecture/epg/' + id,
    method: 'delete'
  })
}
