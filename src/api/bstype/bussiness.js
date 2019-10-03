import request from '@/utils/request'

export function fetchBussiness(query) {
  return request({
    url: '/bstype/bussiness',
    method: 'get',
    params: query
  })
}

export function deleteBussiness(id) {
  return request({
    url: '/bstype/bussiness/' + id,
    method: 'delete'
  })
}

export function createBussiness(data) {
  return request({
    url: '/bstype/bussiness/',
    method: 'post',
    data
  })
}

export function updateBussiness(data) {
  return request({
    url: '/bstype/bussiness/' + data.id,
    method: 'put',
    data
  })
}
