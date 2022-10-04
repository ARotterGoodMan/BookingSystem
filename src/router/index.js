import {createRouter, createWebHashHistory} from "vue-router";
import LoginUp from "@/view/user/LoginUp";
import RemindInfo from "@/view/user/RemindInfo";
import ReserveDate from "@/view/user/ReserveDate";
import ReserveTeacher from "@/view/user/ReserveTeacher";
import UpdateUserInfo from "@/view/user/UpdateUserInfo";
import UserInfo from "@/view/user/UserInfo";


const routes = [
    {
        path: '/',
        component: LoginUp
    },
    {
        path: '/remind',
        component: RemindInfo
    },
    {
        path: '/reserve_teacher',
        component: ReserveTeacher
    },
    {
        path: '/reserve_date',
        component: ReserveDate
    },
    {
        path: '/UserInfo',
        component: UserInfo
    },
    {
        path: '/update',
        component: UpdateUserInfo
    }

]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})