const routes = [
  {
    path: '/',
    redirect: '/backlogInfo'
  },
  {
    path: '/backlogInfo',
    meta: {
      title: '待办详情',
      keepAlive: true
    },
    component: () => import( '@/views/backlogInfo/Index')
  },
  {
    path: '/egress',
    meta: {
      title: '外出',
      keepAlive: true
    },
    component: () => import( '@/views/egress/Index')
  },
  {
    path: '/backlog',
    meta: {
      title: '待办事项',
      keepAlive: true
    },
    component: () => import( '@/views/egress/Index')
  },
  
  {
    path: '/workflowInfo',
    meta: {title: '申请详情'},
    component: () => import('@/views/workflowInfo/Index')
  },
  {
    path: '/workflow',
    meta: {title: '流程处理'},
    component: () => import('@/views/workflow/Index')
  },
  {
    path: '/leave',
    meta: {
      title: '请假',
      keepAlive: true
    },
    component: () => import('@/views/leave/Index')
  },
  {
    path: '/business',
    meta: {
      title: '出差',
      keepAlive: true
    },
    component: () => import('@/views/business/Index')
  },
  {
    path: '/replenishCard',
    meta: {title: '补卡申请'},
    component: () => import('@/views/replenishCard/Index')
  },
  {
    path: '/copyList',
    meta: {title: '抄送'},
    component: () => import('@/views/copyList/Index')
  },
  {
    path: '/vehicle',
    meta: {title: '用车申请'},
    component: () => import('@/views/vehicle/Index')
  },
  {
    path: '/meetingReserve',
    meta: {title: '会议室预定'},
    component: () => import('@/views/meetingReserve/Index')
  },
  {
    path: '/meetingReserveDetails',
    meta: {title: '预定详情'},
    component: () => import('@/views/meetingReserveDetails/Index')
  },
  {
    path: '/invite',
    meta: {title: '邀请加入企业'},
    component: () => import('@/views/invite/Index')
  },
  {
    path: '/authorized',
    meta: {title: '授权登录'},
    component: () => import('@/views/authorized/Index')
  },
  {
    path: '/autoFlow',
    meta: {title: '自定义流程'},
    component: () => import('@/views/autoFlow/Index')
  },
  {
    path: '/autoFlowDetail',
    meta: {title: '自定义流程详情'},
    component: () => import('@/views/autoFlowDetail/Index')
  },
  {
    path: '/autoflowAppro',
    meta: {title: '自定义流程审批'},
    component: () => import('@/views/autoflowAppro/Index')
  },
  {
    path: '*',
    meta: {title: '404'},
    component: () => import('@/views/error/404')
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title
  next()
})

export default router
