import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Course from '@/components/Course'
import CourseDetail from '@/components/CourseDetail'
import DeepTechoDetail from '@/components/DeepTecDetail'
import DeepTecho from '@/components/DeepTec'
import ShopCar from '@/components/ShopCar'
import Help from '@/components/help/Help'
import AboutUs from '@/components/help/AboutUs'
import Feedback from '@/components/help/Feedback'
import UserNote from '@/components/help/UserNote'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/course',
            name: 'course',
            component: Course
        },
        {
            path: '/course/detail/:id',
            name: 'courseDetail',
            component: CourseDetail
        },
        {
            path: '/news',
            name: 'DeepTecho',
            component: DeepTecho
        },
        {
            path: '/news/detail/:aid',
            name: 'DeepTechoDetail',
            component: DeepTechoDetail
        },
        {
            path: '/shopcar',
            name: 'ShopCar',
            component: ShopCar
        },
        {
            path: '/help',
            name: 'help',
            component: Help,
            children: [
                {
                    path: 'about-us',
                    name: 'about-us',
                    component: AboutUs
                },
                {
                    path: 'user-note',
                    name: 'user-note',
                    component: UserNote
                },
                {
                    path: 'feedback',
                    name: 'feedback',
                    component: Feedback
                }
            ]
        }
    ],
    mode: 'history'
})
