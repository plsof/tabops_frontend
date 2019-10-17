/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/upload',
  alwaysShow: true, // will always show the root menu
  name: 'System',
  meta: {
    title: '系统设置',
    icon: 'setting',
    // roles: ['admin'] // you can set roles in root nav
  },
  children: [
    {
      path: 'upload',
      component: () => import('@/views/system/upload'),
      name: 'Upload',
      meta: {
        title: '图片上传',
        // roles: ['admin']
      }
    }
  ]
}
export default systemRouter
