class User {
    constructor() {
        this._id = 0;
        this._email = "";
        this._password = "";
        this._name = "";
        this._surname = "";
        this._age = 0;
        this._sex = 0;
        this._city = "";
        this._interests = "";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get surname() {
        return this._surname;
    }

    set surname(value) {
        this._surname = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    get sex() {
        return this._sex;
    }

    set sex(value) {
        this._sex = value;
    }

    get city() {
        return this._city;
    }

    set city(value) {
        this._city = value;
    }

    get interests() {
        return this._interests;
    }

    set interests(value) {
        this._interests = value;
    }
}