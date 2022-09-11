import User from './domain/user'

const axios = require('axios').default;

const baseUrl = "http://localhost/"

const auth = "/v1/auth"
const reg = "/v1/registration"
const getUser = "/v1/user/:id"
const getUsers = "/v1/users"
const updateUser = "/v1/user"
const createUser = "/v1/user"
const deleteUser = "/v1/user/:id"

function getFullPath(url, id) {
    if (url === getUser || url === deleteUser) {
        url = url.replace(/:id/, id);
    }
    return baseUrl + url
}

export default class userApi {
    __constructor() {
      this.token = ""
    }

    auth(email, password, callback) {
        axios.post(getFullPath(auth), {
            email: email,
            password: password
        })
        .then(function (response) {
            if (response.status == "200") {
                this.token = response.data.token
                callback(response.data.userId,"")
            } else if (response.status == "400") {
                callback("", "ошибка, попробуйте позже")
            } else {
                callback(response.statusText, "ошибка, попробуйте позже")
            }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        })
    }
    register(email, password, name, surname, age, sex, interest, city, callback) {
        axios.post(getFullPath(reg), {
            email: email,
            password: password,
            name:name,
            surname:surname,
            age:age,
            sex:sex,
            city:city,
            interest:interest
        })
        .then(function (response) {
            if (response.status == "200") {
                this.token = response.data.token
                callback(response.data.userId, "")
            } else {
                callback(response.statusText, "ошибка, попробуйте позже")
            }
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        })
    }
    getUser(userId, callback) {
        axios.get(getFullPath(getUser, userId))
            .then(function (response) {
                if (response.status == "200") {
                    callback(response.data,"") // return user
                } else {
                    callback(response.statusText, "ошибка, попробуйте позже")
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })
    }
    getUsers(user, page, perPage, callback) {
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
    }
    updateUser(user, callback) {
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
    }
    createUser(user, callback) {
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
    }
    deleteUser(user, callback) {
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