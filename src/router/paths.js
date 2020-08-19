/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/',
    meta: {
      name: '',
      requiresAuth: true
    },
    redirect: {
      path: '/covid'
    }
  },
  {
    path: '/covid',
    name: 'covid',
    component: () =>    import(`@/components/Covid.vue`),
  }
]
