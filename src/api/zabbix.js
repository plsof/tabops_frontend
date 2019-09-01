import request from '@/utils/request'

export function refresh(data) {
  return request({
    url: '/zabbix/refresh/',
    method: 'post',
    data
  })
}
