import request from '@/utils/request'

export function fetchDms2(query) {
  return request({
    url: '/architecture/dms2',
    method: 'get',
    params: query
  })
}

export function createDms2(data) {
  return request({
    url: '/architecture/dms2/',
    method: 'post',
    data
  })
}

export function updateDms2(data) {
  return request({
    url: '/architecture/dms2/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteDms2(id) {
  return request({
    url: '/architecture/dms2/' + id,
    method: 'delete'
  })
}
