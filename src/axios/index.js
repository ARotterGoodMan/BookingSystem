import axios from "axios";

const get = axios.get;
const post = axios.post;


export default class Axios {
    static url = "http://1.12.246.2:5000"

    static set_insert_data = (user_info, data) => {
        return {
            A_id: user_info.A_id,
            name: user_info.name,
            sex: user_info.sex,
            grade: user_info.grade,
            subjects: user_info.subjects,
            fraction: user_info.fraction,
            school: user_info.school,
            parents: user_info.parents,
            mail: user_info.mail,
            phoneNumber: user_info.phoneNumber,
            remark: data.remark,
            teacher: user_info.teacher,
            date: data.date,
            time: data.time
        }
    }
    static set_update_user_data = (data) => {
        return {
            A_id: data.A_id,
            name: data.name,
            sex: data.sex,
            grade: data.grade,
            subjects: data.subjects.join(" "),
            fraction: data.fraction === '' ? 0 : data.fraction,
            school: data.school,
            parents: data.parents,
            mail: data.mail,
            phoneNumber: data.phoneNumber,
        }
    }

    static login = (that, data) => {
        that.user_info = {}
        get(this.url + "/login?name=" + data.name
            + "&A_id=" + data.A_id).then(res => {
            that.user_info = res.data
        })

    }

    static update_user_info = (data) => {
        let user_data = this.set_update_user_data(data)
        post(this.url + "/update_user_data", user_data)
            .then(res => {
                return res.status
            })
    }

    static get_teacher = (that) => {
        that.teachers = []
        get(this.url + "/get_teacher")
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    that.teachers.push(res.data[i])
                }
            })
    }

    static get_reserve = (that, teacher) => {
        that.reserves = ''
        get(this.url + "/get_reserve?teacher=" + teacher)
            .then(res => {
                that.reserves = res.data
            })
    }

    static my_get_reserve = (that, selectData) => {
        let A_id = selectData.A_id
        let name = selectData.name
        that.my_reserves = []
        get(this.url + "/my_get_reserve?name=" + name + '&A_id=' + A_id)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    that.my_reserves.push(res.data[i])
                }
            })
    }

    static insert = (user_info, date_time) => {
        let data = this.set_insert_data(user_info, date_time)
        post(this.url + "/insert",
            data)
            .then(res => {
                return res.status
            })
    }
    static delete = (data_info) => {
        let data = {
            teacher: data_info.teacher,
            name: data_info.name,
            date: data_info.date,
            time: data_info.time
        }
        post(this.url + "/delete", data)
            .then(res => {
                return res.status
            })
    }

}

