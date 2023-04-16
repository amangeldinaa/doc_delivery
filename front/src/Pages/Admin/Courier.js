import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import axios from "axios";

const Courier = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");
    const [iin, setIin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const apiEndPoint = "http://127.0.0.1:8000/courier"

    const handleAdd = () => {
        console.log(name, surname, phone, company, iin, username, password)
        axios({
            method: 'post',
            url: apiEndPoint,
            headers: {}, 
            data: {
            name: name, 
            surname: surname,
            phone: phone,
            company: company,
            iin: iin,
            }
        }).then((result)=>{
            // alert('Курьер добавлен. Имя пользователя: ' + username + ' Пароль: ' + password);
        }).catch((error)=>{
            console.log(error)
        })

        console.log(username, password)
        axios({
            method: 'post',
            url: "http://127.0.0.1:8000/createuser",
            headers: {}, 
            data: {
                username: username,
                password: password,
            }
        }).then((result)=>{
            console.log(result)
            if(result.data.status === "success") {
                alert('Курьер добавлен. Имя пользователя: ' + username + ' Пароль: ' + password);
                setName("");
                setSurname("");
                setPhone("");
                setCompany("");
                setIin("");
                setUsername("");
                setPassword("");
            } else if(result.data.status === "error") {
                alert('Ошибка добавления курьера. Пользователь с таким именем уже существует.')
            }
        }).catch((error)=>{
            alert('Ошибка добавления курьера. Пользователь с таким именем уже существует.')
            console.log(error)
        })
       
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '40px', width: '80%'}}>
        <h2>Добавить курьера</h2>
        <TextField
            margin="normal"
            type="text"
            placeholder="Имя"
            value={name}
            label="Введите имя"
            onChange={(e) => setName(e.target.value)}
        />
        <TextField
            margin="normal"
            type="text"
            placeholder="Фамилия"
            value={surname}
            label="Введите фамилию"
            onChange={(e) => setSurname(e.target.value)}
        />
        <TextField
            margin="normal"
            type="text"
            placeholder="Телефон"
            value={phone}
            label="Введите номер телефона"
            onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
            margin="normal"
            type="text"
            placeholder="ИИН"
            value={iin}
            label="Введите ИИН"
            onChange={(e) => setIin(e.target.value)}
        />
        <TextField
            margin="normal"
            type="text"
            placeholder="Курьерская служба"
            value={company}
            label="Введите курьерскую службу"
            onChange={(e) => setCompany(e.target.value)}
        />
        <TextField
            margin="normal"
            type="text"
            placeholder="Имя пользователя"
            value={username}
            label="Введите имя пользователя"
            onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
            margin="normal"
            type="password"
            placeholder="Пароль"
            value={password}
            label="Введите пароль"
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button 
            style={{width: '30%', marginTop: 20}} 
            variant="contained"
            onClick={handleAdd}
        >Добавить</Button>
        </div>
    );
};

export default Courier;