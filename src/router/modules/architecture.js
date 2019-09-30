/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/architecture',
  component: Layout,
  redirect: '/architecture/wtv',
  name: 'Architecture',
  meta: {
    title: '业务架构',
    icon: 'tree'
  },
  children: [
    {
      path: 'wtv',
      component: () => import('@/views/architecture/wtv'),
      name: 'Wtv',
      meta: { title: '电视看点' }
    },
    {
      path: 'bimsboot',
      component: () => import('@/views/architecture/bimsboot'),
      name: 'BimsBoot',
      meta: { title: '终端管理' }
    },
    {
      path: 'bimspanel',
      component: () => import('@/views/architecture/bimspanel'),
      name: 'BimsPanel',
      meta: { title: '桌面管理' }
    },
    {
      path: 'tms',
      component: () => import('@/views/architecture/tms'),
      name: 'Tms',
      meta: { title: '播控认证' }
    },
    {
      path: 'epg',
      component: () => import('@/views/architecture/epg'),
      name: 'Epg',
      meta: { title: '播控点播' }
    },
    {
      path: 'search',
      component: () => import('@/views/architecture/search'),
      name: 'Search',
      meta: { title: '搜索' }
    },
    {
      path: 'pic',
      component: () => import('@/views/architecture/pic'),
      name: 'Pic',
      meta: { title: '图片' }
    },
    {
      path: 'ppl',
      component: () => import('@/views/architecture/ppl'),
      name: 'Ppl',
      meta: { title: '看单' }
    },
    {
      path: 'cosepg',
      component: () => import('@/views/architecture/cosepg'),
      name: 'CosEpg',
      meta: { title: '融合EPG' }
    },
    {
      path: 'uic',
      component: () => import('@/views/architecture/uic'),
      name: 'Uic',
      meta: { title: '用户中心' }
    },
    {
      path: 'mscreen',
      component: () => import('@/views/architecture/mscreen'),
      name: 'MScreen',
      meta: { title: '多屏' }
    },
    {
      path: 'dms2',
      component: () => import('@/views/architecture/dms2'),
      name: 'Dms2',
      meta: { title: 'DMS2.0' }
    },
    {
      path: 'xmpp',
      component: () => import('@/views/architecture/xmpp'),
      name: 'XMpp',
      meta: { title: '消息系统' }
    },
    {
      path: 'ndms',
      component: () => import('@/views/architecture/ndms'),
      name: 'ndms',
      meta: { title: 'NDMS' }
    },
    {
      path: 'tos',
      component: () => import('@/views/architecture/tos'),
      name: 'tos',
      meta: { title: 'TOS' }
    },
    {
      path: 'ucs',
      component: () => import('@/views/architecture/ucs'),
      name: 'ucs',
      meta: { title: 'UCS' }
    },
    {
      path: 'mgs',
      component: () => import('@/views/architecture/mgs'),
      name: 'mgs',
      meta: { title: 'MGS' }
    },
    {
      path: 'nmc',
      component: () => import('@/views/architecture/nmc'),
      name: 'nmc',
      meta: { title: 'NMC' }
    },
    {
      path: 'ubs',
      component: () => import('@/views/architecture/ubs'),
      name: 'ubs',
      meta: { title: 'UBS' }
    }
  ]
}
export default tableRouter
