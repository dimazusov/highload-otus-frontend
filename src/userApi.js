import User from './domain/user'
import config from "./config";

const axios = require('axios').default;

const baseUrl = config.scheme+"://"+config.host+":"+config.port

const auth = "/api/v1/auth"
const reg = "/api/v1/registration"
const getUser = "/api/v1/user/:id"
const getUsers = "/api/v1/users"
const updateUser = "/api/v1/user"
const createUser = "/api/v1/user"
const deleteUser = "/api/v1/user/:id"

function getFullPath(url, id) {
    if (url === getUser || url === deleteUser) {
        url = url.replace(/:id/, id);
    }
    return baseUrl + url
}
let token = ""

export function isAuth() {
    return token != ""? true: false;
}
export default {
    auth: function(email, password, callback) {
        console.log("test")
        axios.post(getFullPath(auth), {
            email: email,
            password: password
        })
        .then(function (response) {
            if (response.status === 200) {
                token = response.data.token
                callback(response.data.userId,"")
            } else if (response.status == 400) {
                callback("", "ошибка, попробуйте позже")
            } else {
                callback(response.statusText, "ошибка, попробуйте позже")
            }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        })
    },
    register: function(email, password, name, surname, age, sex, interest, city, callback) {
        let iage = parseInt(age, 10)
        let bsex = sex == "male" ? true : false;

        axios.post(getFullPath(reg), {
            email: email,
            password: password,
            name:name,
            surname:surname,
            age:iage,
            sex:bsex,
            city:city,
            interest:interest
        })
        .then(function (response) {
            if (response.status === 200) {
                token = response.data.token
                callback(response.data.userId, "")
            } else {
                callback(response.statusText, "ошибка, попробуйте позже")
            }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        })
    },
    getUser: function(userId, callback) {
        console.log("path", getFullPath(getUser, userId))
        console.log("this.token",token)

        let config = {
            headers: {
                "X-Auth-Token": token,
            }
        }

        axios.get(getFullPath(getUser, userId), config)
            .then(function (response) {
                if (response.status === 200) {
                    callback(response.data,"") // return user
                } else {
                    callback(response.statusText, "ошибка, попробуйте позже")
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    },
    getUsers: function(user, page, perPage, callback) {
        let url = getFullPath(getUsers) +"?page="+page+"&per_page="+perPage
        axios.get(url)
            .then(function (response) {
                if (response.status == "200") {
                    user = new User();
                    user.id = response.data.id
                    user.email = response.data.email
                    user.name = response.data.name
                    user.surname = response.data.surname
                    user.sex = response.data.sex
                    user.age = response.data.age
                    user.city = response.data.city
                    user.interests = response.data.interest

                    callback(response.data, user)
                } else {
                    callback(response.statusText, "ошибка, попробуйте позже")
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    },
    updateUser: function(user, callback) {
        axios.put(getFullPath(updateUser), {
            id: user.id,
            email: user.email,
            password: user.password,
            name: user.name,
            surname: user.surname,
            age: user.age,
            sex: user.sex,
            city:user.city,
            interest:user.interests
        })
            .then(function (response) {
                if (response.status == "200") {
                    callback("","")
                } else {
                    callback(response.statusText, "ошибка, попробуйте позже")
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    },
    createUser: function(user, callback) {
        axios.post(getFullPath(createUser), {
            email: user.email,
            password: user.password,
            name: user.name,
            surname: user.surname,
            age: user.age,
            sex: user.sex,
            city:user.city,
            interest:user.interests
        })
            .then(function (response) {
                if (response.status == "200") {
                    callback("","")
                } else {
                    callback(response.statusText, "ошибка, попробуйте позже")
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    },
    deleteUser: function(user, callback) {
        axios.delete(getFullPath(deleteUser, user.id))
            .then(function (response) {
                if (response.status == "200") {
                    callback("","")
                } else {
                    callback(response.statusText, "ошибка, попробуйте позже")
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}