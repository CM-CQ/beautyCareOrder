// 路由表
const constantRouterMap = [
  // ************* 前台路由 **************
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/index/home',
    component: () => import('/@/views/index/index.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('/@/views/index/login.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('/@/views/index/register.vue'),
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('/@/views/index/home.vue'),
      },
      {
        path: 'recommend',
        name: 'recommend',
        component: () => import('/@/views/index/recommend.vue'),
      },
      {
        path: 'doctorShow',
        name: 'doctorShow',
        component: () => import('/@/views/index/doctor.vue'),
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('/@/views/index/detail.vue'),
      },
      {
        path: 'confirm',
        name: 'confirm',
        component: () => import('/@/views/index/confirm.vue'),
      },
      {
        path: 'success',
        name: 'success',
        component: () => import('/@/views/index/success.vue'),
      },
      {
        path: 'feedback',
        name: 'feedback',
        component: () => import('/@/views/index/feedback.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('/@/views/index/search.vue'),
      },
      {
        path: 'usercenter',
        name: 'usercenter',
        redirect: '/index/usercenter/userInfoEditView',
        component: () => import('/@/views/index/usercenter.vue'),
        children: [
          {
            path: 'wishThingView',
            name: 'wishThingView',
            component: () => import('/@/views/index/user/wish-thing-view.vue'),
          },
          {
            path: 'collectThingView',
            name: 'collectThingView',
            component: () => import('/@/views/index/user/collect-thing-view.vue'),
          },
          {
            path: 'orderView',
            name: 'orderView',
            component: () => import('/@/views/index/user/order-view.vue'),
          },
          {
            path: 'userInfoEditView',
            name: 'userInfoEditView',
            component: () => import('/@/views/index/user/userinfo-edit-view.vue'),
          },
          {
            path: 'commentView',
            name: 'commentView',
            component: () => import('/@/views/index/user/comment-view.vue'),
          },
          {
            path: 'securityView',
            name: 'securityView',
            component: () => import('/@/views/index/user/security-view.vue'),
          },
          {
            path: 'messageView',
            name: 'messageView',
            component: () => import('/@/views/index/user/message-view.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: () => import('/@/views/admin/admin-login.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/thing',
    component: () => import('/@/views/admin/main.vue'),
    children: [
      {
        path: 'ad',
        name: 'ad',
        component: () => import('/@/views/admin/ad.vue'),
      },
      {
        path: 'classification',
        name: 'classification',
        component: () => import('/@/views/admin/classification.vue'),
      },
      {
        path: 'comment',
        name: 'comment',
        component: () => import('/@/views/admin/comment.vue'),
      },
      {
        path: 'doctor',
        name: 'doctor',
        component: () => import('/@/views/admin/doctor.vue'),
      },
      {
        path: 'errorLog',
        name: 'errorLog',
        component: () => import('/@/views/admin/error-log.vue'),
      },
      {
        path: 'feedbackList',
        name: 'feedbackList',
        component: () => import('/@/views/admin/feedbackList.vue'),
      },
      {
        path: 'loginLog',
        name: 'loginLog',
        component: () => import('/@/views/admin/login-log.vue'),
      },
      {
        path: 'notice',
        name: 'notice',
        component: () => import('/@/views/admin/notice.vue'),
      },
      {
        path: 'opLog',
        name: 'opLog',
        component: () => import('/@/views/admin/op-log.vue'),
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('/@/views/admin/order.vue'),
      },
      {
        path: 'overview',
        name: 'overview',
        component: () => import('/@/views/admin/overview.vue'),
      },
      {
        path: 'sysInfo',
        name: 'sysInfo',
        component: () => import('/@/views/admin/sys-info.vue'),
      },
      {
        path: 'tag',
        name: 'tag',
        component: () => import('/@/views/admin/tag.vue'),
      },
      {
        path: 'thing',
        name: 'thing',
        component: () => import('/@/views/admin/thing.vue'),
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('/@/views/admin/user.vue'),
      },
    ]
  },
];

export default constantRouterMap;
