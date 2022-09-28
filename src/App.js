import { BrowserRouter, Route, Routes, Link, useParams, Navigate} from "react-router-dom";
import { useState } from 'react';
import api from './userApi';

import {Col, Row,Button, Container, Form} from "react-bootstrap";

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
    const [userId] = useState(0);
    if (!userId) {
        return <Navigate to={"/auth"} />
    }
    return <Navigate to={"/profile/"+userId} />
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

function AuthAction(email, password, setUserId) {
    api.auth(email, password, function (userId, err) {
        if (err) {
            console.log("error", err)
            return
        }
       setUserId(userId)
    })
}

function RegisterAction(email, password, name, surname, age, sex, interest, city, setUserId) {
    api.register(email, password, name, surname, age, sex, interest, city, function(userId, err) {
        if (err != "") {
            console.log("error", err);
            return
        }
        setUserId(userId);
    });
}

function Auth() {
    const [userId, setUserId] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onInputEmail = (e) => setEmail(e.target.value);
    const onInputPassword = (e) => setPassword(e.target.value);

    if (userId > 0) {
        return <Navigate to={"/profile/"+userId} />
    }

    return <Container className={"p-3"}>
        <div className="border d-flex align-items-center justify-content-center p-5 rounded">
            <div className="d-flex flex-column">
                <div className="p-2">
                    <h1>Авторизация</h1>
                </div>
                <div className="p-2">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control type="email" onChange={onInputEmail} placeholder="Введите email"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" onChange={onInputPassword} placeholder="Введите пароль"/>
                            <Form.Text className="text-muted">
                                Пароль должен состоять не менее чем из восьми символов
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="С правилами сайта ознакомлен"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e) => {
                            e.preventDefault()
                            AuthAction(email, password, setUserId)
                        }}>Войти</Button>
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
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [age, setAge] = useState();
    const [sex, setSex] = useState();
    const [interest, setInterest] = useState();
    const [city, setCity] = useState();

    const onInputEmail = (e) => setEmail(e.target.value);
    const onInputPassword = (e) => setPassword(e.target.value);
    const onInputName = (e) => setName(e.target.value);
    const onInputSurname = (e) => setSurname(e.target.value);
    const onInputAge = (e) => setAge(e.target.value);
    const onInputSexMale = (e) => setSex("male");
    const onInputSexFemale = (e) => setSex("female");
    const onInputInterest = (e) => setInterest(e.target.value);
    const onInputCity = (e) => setCity(e.target.value);

    if (userId > 0) {
        return <Navigate to={"/profile/"+userId} />
    }

    return <Container className={"p-3"}>
        <div className="border d-flex align-items-center justify-content-center p-5 rounded">
            <div className="d-flex flex-column">
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
                            <Form.Control type="email" onChange={onInputEmail} placeholder="Введите email"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" onChange={onInputPassword} placeholder="Придумайте пароль" />
                            <Form.Text className="text-muted">
                                Пароль должен состоять не менее чем из восьми символов
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control type="text" placeholder="Ваше имя" onChange={onInputName}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control type="text" placeholder="Ваша фамилия" onChange={onInputSurname}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>Возраст</Form.Label>
                            <Form.Control type="text" placeholder="Введите возраст" onChange={onInputAge}/>
                        </Form.Group>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sex" onChange={onInputSexMale}/>
                            <label className="form-check-label" htmlFor="male">Мужской</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sex" onChange={onInputSexFemale}/>
                            <label className="form-check-label" htmlFor="female">Женский</label>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Интересы</label>
                            <textarea className="form-control" id="interests" rows="3" onChange={onInputInterest}></textarea>
                        </div>

                        <Form.Group className="mb-3" controlId="city">
                            <Form.Label>Город</Form.Label>
                            <Form.Control type="text" placeholder="Ваш город" onChange={onInputCity}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="С правилами сайта ознакомлен"/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={(e) => {
                            e.preventDefault();
                            RegisterAction(email,password,name,surname,age,sex,interest,city,setUserId)
                        }}>
                            Зарегистрироваться
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    </Container>;
}