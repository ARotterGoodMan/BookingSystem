import {createRouter, createWebHashHistory} from "vue-router";
import LoginUp from "@/view/LoginUp";
import RemindInfo from "@/view/RemindInfo";
import ReserveDate from "@/view/ReserveDate";
import ReserveTeacher from "@/view/ReserveTeacher";
import UpdateUserInfo from "@/view/UpdateUserInfo";
import UserInfo from "@/view/UserInfo";


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