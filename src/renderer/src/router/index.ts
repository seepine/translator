import {
  createRouter,
  createWebHashHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: () => import('../pages/layout/index.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../pages/home/index.vue')
      },
      {
        path: '/setting',
        name: 'Setting',
        meta: {
          title: '设置'
        },
        component: () => import('../pages/setting/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    if (to.meta.title) {
      document.title = `${String(to.meta.title ? to.meta.title : to.name)} - Translater`
    } else {
      document.title = 'Translater'
    }
    next()
  }
)

export default router
