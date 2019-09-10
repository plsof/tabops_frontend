import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/user/register/',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/user/info/' + data.id,
    method: 'patch',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/user/info/${id}`,
    method: 'delete'
  })
}
