/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const architectureRouter = {
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
      component: () => import('@/views/architecture/wtv/index'),
      name: 'Wtv',
      meta: { title: '电视看点' },
      redirect: '/architecture/wtv/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/wtv/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/wtv/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'bimsboot',
      component: () => import('@/views/architecture/bimsboot/index'),
      name: 'BimsBoot',
      meta: { title: '终端管理' },
      redirect: '/architecture/bimsboot/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/bimsboot/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/bimsboot/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'bimspanel',
      component: () => import('@/views/architecture/bimspanel/index'),
      name: 'BimsPanel',
      meta: { title: '桌面管理' },
      redirect: '/architecture/bimspanel/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/bimspanel/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/bimspanel/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'tms',
      component: () => import('@/views/architecture/tms/index'),
      name: 'Tms',
      meta: { title: '播控认证' },
      redirect: '/architecture/tms/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/tms/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/tms/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'epg',
      component: () => import('@/views/architecture/epg/index'),
      name: 'Epg',
      meta: { title: '播控点播' },
      redirect: '/architecture/epg/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/epg/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/epg/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'search',
      component: () => import('@/views/architecture/search/index'),
      name: 'Search',
      meta: { title: '搜索' },
      redirect: '/architecture/search/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/search/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/search/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'pic',
      component: () => import('@/views/architecture/pic/index'),
      name: 'Pic',
      meta: { title: '图片' },
      redirect: '/architecture/pic/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/pic/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/pic/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'ppl',
      component: () => import('@/views/architecture/ppl/index'),
      name: 'Ppl',
      meta: { title: '看单' },
      redirect: '/architecture/ppl/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/ppl/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/ppl/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'cosepg',
      component: () => import('@/views/architecture/cosepg/index'),
      name: 'CosEpg',
      meta: { title: '融合EPG' },
      redirect: '/architecture/cosepg/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/cosepg/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/cosepg/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'uic',
      component: () => import('@/views/architecture/uic/index'),
      name: 'Uic',
      meta: { title: '用户中心' },
      redirect: '/architecture/uic/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/uic/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/uic/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'mscreen',
      component: () => import('@/views/architecture/mscreen/index'),
      name: 'MScreen',
      meta: { title: '多屏' },
      redirect: '/architecture/mscreen/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/mscreen/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/mscreen/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'dms2',
      component: () => import('@/views/architecture/dms2/index'),
      name: 'Dms2',
      meta: { title: 'DMS2.0' },
      redirect: '/architecture/dms2/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/dms2/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/dms2/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'xmpp',
      component: () => import('@/views/architecture/xmpp/index'),
      name: 'XMpp',
      meta: { title: '消息系统' },
      redirect: '/architecture/xmpp/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/xmpp/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/xmpp/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'ndms',
      component: () => import('@/views/architecture/ndms/index'),
      name: 'ndms',
      meta: { title: 'NDMS' },
      redirect: '/architecture/ndms/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/ndms/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/ndms/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'tos',
      component: () => import('@/views/architecture/tos/index'),
      name: 'tos',
      meta: { title: 'TOS' },
      redirect: '/architecture/tos/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/tos/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/tos/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'ucs',
      component: () => import('@/views/architecture/ucs/index'),
      name: 'ucs',
      meta: { title: 'UCS' },
      redirect: '/architecture/ucs/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/ucs/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/ucs/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'mgs',
      component: () => import('@/views/architecture/mgs/index'),
      name: 'mgs',
      meta: { title: 'MGS' },
      redirect: '/architecture/mgs/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/mgs/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/mgs/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'nmc',
      component: () => import('@/views/architecture/nmc/index'),
      name: 'nmc',
      meta: { title: 'NMC' },
      redirect: '/architecture/nmc/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/nmc/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/nmc/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    },
    {
      path: 'ubs',
      component: () => import('@/views/architecture/ubs/index'),
      name: 'ubs',
      meta: { title: 'UBS' },
      redirect: '/architecture/ubs/diagram',
      children: [
        {
          path: 'diagram',
          component: () => import('@/views/architecture/ubs/diagram'),
          name: '架构图',
          meta: { title: '架构图' }
        },
        {
          path: 'structure',
          component: () => import('@/views/architecture/ubs/structure'),
          name: '部署信息',
          meta: { title: '部署信息' }
        }
      ]
    }
  ]
}
export default architectureRouter
