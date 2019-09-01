/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const assetRouter = {
  path: '/asset',
  component: Layout,
  redirect: '/asset/idc',
  name: 'Asset',
  meta: {
    title: '资产管理',
    icon: 'list'
  },
  children: [
    {
      path: 'idc',
      component: () => import('@/views/asset/idc'),
      name: 'IDC',
      meta: { title: '机房' }
    },
    {
      path: 'cabinet',
      component: () => import('@/views/asset/cabinet'),
      name: 'Cabinet',
      meta: { title: '机柜' }
    },
    {
      path: 'rack',
      component: () => import('@/views/asset/rack'),
      name: 'Rack',
      meta: { title: '机架' }
    },
    {
      path: 'shost',
      component: () => import('@/views/asset/shost'),
      name: 'Shost',
      meta: { title: '宿主机' }
    },
    {
      path: 'host',
      component: () => import('@/views/asset/host'),
      name: 'Host',
      meta: { title: '主机' }
    }
  ]
}
export default assetRouter
