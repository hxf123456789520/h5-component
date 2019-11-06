import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/nav'
        },{
            // 菜单组件
            path: '/nav',
            component: resolve => require(['../components/page/nav.vue'], resolve),
            meta: { title: '菜单组件' }
        },{
            // 日历组件
            path: '/calendar',
            component: resolve => require(['../components/page/calendar.vue'], resolve),
            meta: { title: '日历组件' }
        },
        {
            // 日历组件
            path: '/calendarForm',
            component: resolve => require(['../components/page/calendarForm.vue'], resolve),
            meta: { title: '新建日程' }
        },
        {
            // 日历组件
            path: '/calendarSelect',
            component: resolve => require(['../components/page/calendarSelect.vue'], resolve),
            meta: { title: '新建日程' }
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve),
            meta: { title: '404' }
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve),
            meta: { title: '403' }
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
