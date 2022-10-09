import axios from "axios";

const get = axios.get;
const post = axios.post;
axios.defaults.baseURL = "http://1.12.246.2:5000/"

export default class Axios {
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
        data = {
            name: data.name,
            A_id: data.A_id
        }
        that.user_info = {}
        post("login", data).then(res => {
            that.user_info = res.data
        })
    }

    static a_logon = (that, data) => {
        post("a_login", data).then(res => {
            that.A_login_status.state = res.data.state
            that.A_login_status.error = res.data.error
        })
    }

    static a_get_reserve = (that) => {
        that.my_reserves = []
        get("a_get_reserve")
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    that.my_reserves.push(res.data[i])
                }
            })
    }

    static update_user_info = (data) => {
        let user_data = this.set_update_user_data(data)
        post("update_user_data", user_data)
            .then(res => {
                return res.status
            })
    }

    static get_teacher = (that) => {
        that.teachers = []
        get("get_teacher")
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    that.teachers.push(res.data[i])
                }
            })
    }

    static get_reserve = (that, teacher) => {
        that.reserves = ''
        get("get_reserve?teacher=" + teacher)
            .then(res => {
                that.reserves = res.data
            })
    }

    static my_get_reserve = (that, selectData) => {
        let A_id = selectData.A_id
        let name = selectData.name
        that.my_reserves = []
        get("my_get_reserve?name=" + name + '&A_id=' + A_id)
            .then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    that.my_reserves.push(res.data[i])
                }
            })
    }

    static insert = (user_info, date_time) => {
        let data = this.set_insert_data(user_info, date_time)
        post("insert", data)
            .then(res => {
                return res.status
            })
    }
    static delete = (data_info) => {
        let data = {
            teacher: data_info.teacher, name: data_info.name, date: data_info.date, time: data_info.time
        }
        post("delete", data)
            .then(res => {
                return res.status
            })
    }
    static rest_day = (that) => {
        that.rest_day = []
        get("rest_day").then(res => {
            for (let i = 0; i < res.data.length; i++) {
                that.rest_day.push(res.data[i])
            }
        })
    }
    static setting_rest_day = (data) => {
        post("setting_rest", data).then(
            res => {
                return res.status
            }
        )
    }
    static del_rest = (data) => {
        post(this.url + "/del_rest", data).then(
            res => {
                return res.status
            }
        )
    }
    static export = () => {
        post("export").then(
            res => {
                const blob = new Blob([res.data], {
                    type: 'application/vnd.ms-excel'
                })
                let downloadElement = document.createElement('a');
                let href = window.URL.createObjectURL(blob);
                downloadElement.href = href;
                downloadElement.download = '预约信息.xlsx';
                document.body.appendChild(downloadElement);
                downloadElement.click();
                document.body.removeChild(downloadElement);
                window.URL.revokeObjectURL(href);
            }
        )
    }
}

