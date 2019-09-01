import request from '@/utils/request'

export function fetchPic(query) {
  return request({
    url: '/architecture/pic',
    method: 'get',
    params: query
  })
}

export function createPic(data) {
  return request({
    url: '/architecture/pic/',
    method: 'post',
    data
  })
}

export function updatePic(data) {
  return request({
    url: '/architecture/pic/' + data.id,
    method: 'put',
    data
  })
}

export function deletePic(id) {
  return request({
    url: '/architecture/pic/' + id,
    method: 'delete'
  })
}
