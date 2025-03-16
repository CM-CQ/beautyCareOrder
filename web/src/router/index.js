import { createRouter, createWebHistory } from 'vue-router';
import root from './root';

import { ADMIN_USER_TOKEN, USER_TOKEN } from '/@/store/constants';

// 路由权限白名单
const allowList = ['adminLogin', 'login', 'feedback', 'register', 'home', 'recommend','doctorShow','search', 'detail', '403', '404'];
// 前台登录地址
const loginRoutePath = '/index/login';
// 后台登录地址
const adminLoginRoutePath = '/adminLogin';

const router = createRouter({
  history: createWebHistory(),
  routes: root,
});

router.beforeEach(async (to, from, next) => {
  console.log(to, from);

  /** 后台路由 **/
  if (to.path.startsWith('/admin')) {
    //判断管理员是否有登录的token
    if (localStorage.getItem(ADMIN_USER_TOKEN)) {
      //若管理员有登录但是它去向却是管理员登录界面
      if (to.path === adminLoginRoutePath) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      if (allowList.includes(to.name)) {
        // 在免登录名单，直接进入
        next();
      } else {
        //管理员账号未登录 且未在免登录页面名单里 去向管理员登录界面
        next({ path: adminLoginRoutePath, query: { redirect: to.fullPath } });
      }
    }
    // next()
  }

  /** 前台路由 **/
  if (to.path.startsWith('/index')) {
    if (localStorage.getItem(USER_TOKEN)) {
      //用户已经登录但是去向的页面是用户登录页面
      if (to.path === loginRoutePath) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      if (allowList.includes(to.name)) {
        // 在免登录名单，直接进入
        next();
      } else {
        next({ path: loginRoutePath, query: { redirect: to.fullPath } });
      }
    }
    // next()
  }
});

router.afterEach((_to) => {
  // 回到顶部
  document.getElementById('html')?.scrollTo(0, 0);
});

export default router;
