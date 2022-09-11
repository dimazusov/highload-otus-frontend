import {useNavigate ,  BrowserRouter, Route, Routes, Link, useParams, Navigate} from "react-router-dom";
import { useState } from 'react';

import {Col, Row,Button, Container, Form} from "react-bootstrap";
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
    // const [user, setUser] = useState();

    let user = {
        "email": "utkin@yandex.ru",
        "name": "Василий",
        "surname": "Уткин",
        "age": 27,
        "sex": "Мужской",
        "interests": "Тенис, Футбол",
        "city": "Москва"
    }

    return <Container className={"p-3"}>
        <div className="border d-flex  p-4 rounded">
            <div className="d-flex flex-column">
                <div className="p-2">
                    <h1>Профайл {params.id} {user.name} {user.surname}</h1>
                </div>
                <Container fluid="md">
                    <Row>
                        <Col xs lg="2" md={"left"}>Email: </Col>
                        <Col xs lg="2" md={"left"}>{user.email}</Col>
                    </Row>
                    <Row>
                        <Col xs lg="2" md={"left"}>Имя: </Col>
                        <Col xs lg="2" md={"left"}>{user.name}</Col>
                    </Row>
                    <Row>
                        <Col xs lg="2" md={"left"}>Фамилия: </Col>
                        <Col xs lg="2" md={"left"}>{user.surname}</Col>
                    </Row>
                    <Row>
                        <Col xs lg="2" md={"left"}>Возраст: </Col>
                        <Col xs lg="2" md={"left"}>{user.age}</Col>
                    </Row>
                    <Row>
                        <Col xs lg="2" md={"left"}>Пол: </Col>
                        <Col xs lg="2" md={"left"}>{user.sex}</Col>
                    </Row>
                    <Row>
                        <Col xs lg="2" md={"left"}>Интересы: </Col>
                        <Col xs lg="8" md={"left"}>{user.interests}</Col>
                    </Row>
                    <Row>
                        <Col xs lg="2" md={"left"}>Город: </Col>
                        <Col xs lg="2" md={"left"}>{user.city}</Col>
                    </Row>
                </Container>
            </div>
        </div>
    </Container>
}

function AuthAction(e, setUserId) {
    e.preventDefault();
    setUserId(2);

    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    //
    // let d = new userApi()
    // d.auth(email, password, function (userId,err) {
    //    setUserId(response.data.userId)
    // })
}

function RegisterAction(e,setUserId) {
    e.preventDefault();
    setUserId(2)

    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    // let name = document.getElementById("name").value;
    // let surname = document.getElementById("surname").value;
    // let age = document.getElementById("age").value;
    // let sex;
    // if (document.getElementById("male").checked) {
    //     // let male = document.getElementById("male").checked;
    //     // let femail = document.getElementById("female").checked;
    //     sex = true;
    // } else {
    //     sex = false;
    // }
    // let interests = document.getElementById("interests").value;
    // let city = document.getElementById("city").value;

    // let d = new userApi();
    // d.register(email, password, name, surname, age, sex, interests, city, function(userId, err) {
    //     if (err !== "") {
    //        console.log(err)
    //     }
    //     setUserId(userId)
    // })

    return false;
}

function GetUserAction() {
    // let id = 1
    // d.getUser(id, function (user, err) {
    //
    // })
}

function Auth() {
    const [userId, setUserId] = useState(0);

    if (userId !== 0) {
        return <Navigate to={"/profile/"+userId} />
    }

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
                        <Button variant="primary" type="submit" onClick={(e) => {
                            AuthAction(e, setUserId)
                        }}>
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
    const [userId, setUserId] = useState(0);

    if (userId !== 0) {
        return <Navigate to={"/profile/"+userId} />
    }

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

                        <Button variant="primary" type="submit" onClick={(e) => {
                            RegisterAction(e, setUserId)
                        }}>
                            Зарегистрироваться
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    </Container>;
}