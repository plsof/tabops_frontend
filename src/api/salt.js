import request from '@/utils/request'

export function scan(data) {
  return request({
    url: '/salt/scan/',
    method: 'post',
    data,
    timeout: 10000
  })
}
