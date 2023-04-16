import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Auth.css";
import { Box, TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from 'react-router-dom';

import axios from "axios";

import authContext from "../Contexts";

const Signin = () => {
  const { authenticated, setAuthenticated } = useContext(authContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [navigated, setNavigated] = useState(false)

  const apiEndPoint = "http://127.0.0.1:8000/createuser"

  const loadUsers = async () => {
    const result = await axios.get(apiEndPoint);
    setUser(result.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    if(navigated) {
      alert("Ваше имя пользователя не существует. Пожалуйста, свяжитесь с администратором.")
    }
  }, [navigated]);

  const login = async (e) => {
    console.log("login");
    console.log(username, password);
    // console.log(user);
    user.forEach(element => {
      console.log(element.username, username);
      console.log(element.password, password);
      if(element.username === username && element.password === password) {
        console.log("OK");
        navigate('/courier-info', {state: {username: username}});
        
      }
    });
    setNavigated(true)
    // if(navigated) {
    //   alert("Your username does not exist. Please contact Administrator.")
    // }
    // alert("Your username does not exist. Please contact Administrator.")

    e.preventDefault();
    // try {
    //   await axios
    //     .post(
    //       "http://localhost:5000/login",
    //       {
    //         username,
    //         password,
    //       },
    //       { withCredentials: true }
    //     )
    //     .then((res) => {
    //       if (res.status === 200) {
    //         navigate("/courier");
    //         setAuthenticated(1);
    //       } else if (res.status === 201) {
    //         setAuthenticated(2);
    //         navigate("/psc");
    //       } else if (res.status === 202) {
    //         setAuthenticated(3);
    //       }
    //     });
    // } catch (error) {
    //   console.log(error);
    //   setAuthenticated(99);
    // }
  };

  return (
    <div 
    // style={{backgroundColor:'#87CEFA'}}
    >
      <form onSubmit={login}>
        <Box
          margin="auto"
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          marginTop={10}
          borderRadius={5}
          padding={3}
          // boxShadow={"5px 5px 5px #ccc"}
          boxShadow={" 0 0 5px 2px  rgba(0, 0, 0, 0.1)"}
          sx={{}}
        >
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Typography variant="h4" padding={3} text-align="center">
              Sign in
            </Typography>
          </div>

          <TextField
            error={authenticated == 99 ? true : false}
            margin="normal"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label={authenticated == 99 ? "Not valid" : "Username"}
          />
          <TextField
            error={authenticated == 99 ? true : false}
            margin="normal"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Button type="submit" endIcon={<LoginIcon />}>
              Login
            </Button>
            {/* <Button 
                style={{width: '60%', marginTop: 20}} 
                variant="contained" endIcon={<LoginIcon />}
            >Login</Button> */}
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Signin;
