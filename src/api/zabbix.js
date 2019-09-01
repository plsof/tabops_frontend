import request from '@/utils/request'

export function refresh(data) {
  return request({
    url: '/zabbix/refresh/port/',
    method: 'post',
    data
  })
}

export function refresh_agent(data) {
  return request({
    url: '/zabbix/refresh/agent/',
    method: 'post',
    data
  })
}
