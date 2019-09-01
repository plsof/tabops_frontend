import request from '@/utils/request'

export function fetchPpl(query) {
  return request({
    url: '/architecture/ppl',
    method: 'get',
    params: query
  })
}

export function createPpl(data) {
  return request({
    url: '/architecture/ppl/',
    method: 'post',
    data
  })
}

export function updatePpl(data) {
  return request({
    url: '/architecture/ppl/' + data.id,
    method: 'put',
    data
  })
}

export function deletePpl(id) {
  return request({
    url: '/architecture/ppl/' + id,
    method: 'delete'
  })
}
