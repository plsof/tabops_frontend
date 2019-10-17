import request from '@/utils/request'

export function getFiles(query) {
  return request({
    url: '/upload',
    method: 'get',
    params: query
  })
}

export function deleteFile(id) {
  return request({
    url: '/upload/' + id,
    method: 'delete'
  })
}
