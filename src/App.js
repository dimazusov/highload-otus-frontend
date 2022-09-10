import {useNavigate ,BrowserRouter, Route, Routes, Link, useParams} from "react-router-dom";
import { useState } from 'react';

import {Button, Container, Form} from "react-bootstrap";
import userApi from "./userApi";

export default function App() {
    return (
        <BrowserRouter>
            {/*<nav>*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*            <Link to="/">Home</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/auth">About</Link>*/}
            {/*        </li>*/}
            {/*        <li>*/}
            {/*            <Link to="/register">Users</Link>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</nav>*/}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile/:id" element={<Profile/>}/>
            </Routes>
        </BrowserRouter>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function Profile() {
    let params = useParams();

    return <Container className={"p-3"}>
        <div className="d-flex flex-column">
            <div className="p-2">
                <h1>Профайл {params.id}</h1>
            </div>
        </div>
    </Container>
}

function AuthAction() {
    // let d = new userApi()
    // let email = ""
    // let password = ""
    //
    // // todo получить данные
    // // todo сделать редирект
    // d.auth(email, password, function (data,err) {
    //     // redirect to /
    // })
}

function RegisterAction(e) {
    e.preventDefault();
    let obj = {
        "email":document.getElementById("email").value,
        "password":document.getElementById("password").value,
        "name":document.getElementById("name").value,
        "surname":document.getElementById("surname").value,
        "age":document.getElementById("age").value,
        "male":document.getElementById("male").checked,
        "femail":document.getElementById("female").checked,
        "interests":document.getElementById("interests").value,
        "city":document.getElementById("city").value
    }

    let d = new userApi();
    d.register(email, password, name, surname, age, sex, interest, city, function(userId, err) {
        if (err !== "") {
            console.log(err)
        }
        location.href = "/profile/"+userId
    })
}

function GetUserAction() {
    // let id = 1
    // d.getUser(id, function (user, err) {
    //
    // })
}

function Auth() {
    return <Container className={"p-3"}>
        <div className="border d-flex align-items-center justify-content-center p-5 rounded">
            <div class="d-flex flex-column">
                <div className="p-2">
                    <h1>Авторизация</h1>
                </div>
                <div className="p-2">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control type="email" placeholder="Введите email"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль"/>
                            <Form.Text className="text-muted">
                                Пароль должен состоять не менее чем из восьми символов
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="С правилами сайта ознакомлен"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onSubmit={AuthAction}>
                            Войти
                        </Button>
                    </Form>
                </div>
                <div className="p-2">
                    нет аккаунта? <Link to={"/register"}>зарегистрируйтесь</Link>
                </div>
            </div>
        </div>
    </Container>;
}

function Register() {
    return <Container className={"p-3"}>
        <div className="border d-flex align-items-center justify-content-center p-5 rounded">
            <div class="d-flex flex-column">
                <div className="p-2">
                    <h1>Регистрация</h1>
                </div>
                <div className="p-2">
                    уже есть аккаунт? <Link to="/auth">войти</Link>
                </div>
                <div className="p-2">
                    <Form>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control type="email" placeholder="Введите email"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Придумайте пароль"/>
                            <Form.Text className="text-muted">
                                Пароль должен состоять не менее чем из восьми символов
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control type="text" placeholder="Ваше имя"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control type="text" placeholder="Ваша фамилия"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>Возраст</Form.Label>
                            <Form.Control type="text" placeholder="Введите возраст"/>
                        </Form.Group>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sex" id="male" />
                            <label className="form-check-label" htmlFor="male">Мужской</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sex" id="female" />
                            <label className="form-check-label" htmlFor="female">Женский</label>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Интересы</label>
                            <textarea className="form-control" id="interests" rows="3"></textarea>
                        </div>

                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>Город</Form.Label>
                            <Form.Control type="text" placeholder="Ваш город"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="С правилами сайта ознакомлен"/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onSubmit={RegisterAction}>
                            Зарегистрироваться
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    </Container>;
}