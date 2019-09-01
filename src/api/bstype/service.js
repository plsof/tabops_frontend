import request from '@/utils/request'

export function fetchService(query) {
  return request({
    url: '/bstype/service',
    method: 'get',
    params: query
  })
}

export function fetchServiceAll() {
  return request({
    url: '/bstype/serviceall',
    method: 'get'
  })
}

export function deleteService(id) {
  return request({
    url: '/bstype/service/' + id,
    method: 'delete'
  })
}

export function createService(data) {
  return request({
    url: '/bstype/service/',
    method: 'post',
    data
  })
}

export function updateService(data) {
  return request({
    url: '/bstype/service/' + data.id,
    method: 'put',
    data
  })
}
