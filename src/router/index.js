import {createRouter, createWebHashHistory} from "vue-router";
import LoginUp from "@/view/user/LoginUp";
import RemindInfo from "@/view/user/RemindInfo";
import ReserveDate from "@/view/user/ReserveDate";
import ReserveTeacher from "@/view/user/ReserveTeacher";
import UpdateUserInfo from "@/view/user/UpdateUserInfo";
import UserInfo from "@/view/user/UserInfo";
import ALoginUp from "@/view/admin/ALoginUp";
import ARemindInfo from "@/view/admin/ARemindInfo";
import RestDay from "@/view/admin/RestDay";
import TeacherList from "@/view/admin/TeacherList";


const routes = [{
    path: '/', component: LoginUp
}, {
    path: '/admin', component: ALoginUp
}, {
    path: '/admin/remind', component: ARemindInfo
}, {
    path: '/admin/rest_day', component: RestDay
}, {
    path: '/admin/teachers', component: TeacherList
}, {
    path: '/remind', component: RemindInfo
}, {
    path: '/reserve_teacher', component: ReserveTeacher
}, {
    path: '/reserve_date', component: ReserveDate
}, {
    path: '/UserInfo', component: UserInfo
}, {
    path: '/update', component: UpdateUserInfo
}]

export const router = createRouter({
    history: createWebHashHistory(), routes: routes
})