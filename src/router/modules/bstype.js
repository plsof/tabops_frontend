/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const bstypeRouter = {
  path: '/bstype',
  component: Layout,
  redirect: '/bstype/bussiness',
  name: 'BsType',
  meta: {
    title: '业服类型',
    icon: 'nested'
  },
  children: [
    {
      path: 'bussiness',
      component: () => import('@/views/bstype/bussiness'),
      name: 'Bussiness',
      meta: { title: '业务类型' }
    },
    {
      path: 'service',
      component: () => import('@/views/bstype/service'),
      name: 'Service',
      meta: { title: '服务类型' }
    }
  ]
}
export default bstypeRouter
