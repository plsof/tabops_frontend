import request from '@/utils/request'

export function fetchNMC(query) {
  return request({
    url: '/architecture/nmc',
    method: 'get',
    params: query
  })
}

export function createNMC(data) {
  return request({
    url: '/architecture/nmc/',
    method: 'post',
    data
  })
}

export function updateNMC(data) {
  return request({
    url: '/architecture/nmc/' + data.id,
    method: 'put',
    data
  })
}

export function deleteNMC(id) {
  return request({
    url: '/architecture/nmc/' + id,
    method: 'delete'
  })
}
