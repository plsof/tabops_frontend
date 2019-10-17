import request from '@/utils/request'

export function getFiles() {
  return request({
    url: '/upload',
    method: 'get'
  })
}

export function deleteFile(id) {
  return request({
    url: '/upload/' + id,
    method: 'delete'
  })
}
