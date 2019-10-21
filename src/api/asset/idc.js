import request from '@/utils/request'

export function fetchIdc(query) {
  return request({
    url: '/asset/idc',
    method: 'get',
    params: query
  })
}

export function createIdc(data) {
  return request({
    url: '/asset/idc/',
    method: 'post',
    data
  })
}

export function updateIdc(data) {
  return request({
    url: '/asset/idc/' + data.id + '/',
    method: 'put',
    data
  })
}

export function deleteIdc(id) {
  return request({
    url: '/asset/idc/' + id,
    method: 'delete'
  })
}
