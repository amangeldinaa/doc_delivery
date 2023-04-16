import React from "react";
import { useState, useContext, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import qs from "qs";
import { Navigate, Link } from "react-router-dom";
import authContext from "../Contexts";
import { useNavigate } from "react-router-dom";
const ClientSignin = () => {
  const navigate = useNavigate();
  const [iin, setIin] = useState("");
  const [applicationNum, setApplicationNum] = useState(12345);
  const [auth, setAuth] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(iin);
    await getToken();
  };
  const [info, setInfo] = useState({
    iin: "",
    lastName: "",
    firstName: "",
  });

  const [isErr, setisErr] = useState(false);
  const [address, setAddress] = useState("");

  const [token, setToken] = useState("");

  useEffect(() => {
    if (token.length) {
      getClient();
    }
  }, [token]);
  const getToken = async () => {
    const url =
      "http://hakaton-idp.gov4c.kz/auth/realms/con-web/protocol/openid-connect/token";
    const data = qs.stringify({
      username: "test-operator",
      password: "DjrsmA9RMXRl",
      client_id: "cw-queue-service",
      grant_type: "password",
    });

    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    console.log(config);
    await axios(config)
      .then((response) => {
        setToken(response.data.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getClient = async () => {
    // var it = iin[Math.floor(Math.random() * iin.length)];
    // console.log(iin);
    // setItem(it);
    const url = "http://hakaton-fl.gov4c.kz/api/persons/" + iin + "/";
    console.log(token);
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios(config)
      .then((response) => {
        setAuth(true);
        setisErr(false);
        setInfo(response.data);
        setAddress(response.data.regAddress.address);
        console.log(JSON.stringify(response.data.regAddress.address));
        navigate("/courier", { state: { submittedValue: response.data } });
      })
      .catch((error) => {
        console.log(token);
        setisErr(true);
      });
  };

  return (
    <div>
      <form>
        <Box
          margin="auto"
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          marginTop={10}
          borderRadius={10}
          padding={3}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{}}
        >
          <Typography variant="h4" padding={3} text-align="center">
            Добро пожаловать!
          </Typography>

          <TextField
            disabled
            margin="normal"
            type="text"
            placeholder="Номер заявки"
            value={applicationNum}
            label="Номер заявки"
          />
          <TextField
            margin="normal"
            type="text"
            placeholder="ИИН"
            value={iin}
            label="Введите ИИН"
            onChange={(e) => setIin(e.target.value)}
            error={isErr ? true : false}
          />

          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="btn-sign"
          >
            {console.log(applicationNum)}
            <Button
              onClick={handleClick}
              style={{ width: "100%" }}
              variant="contained"
            >
              Register
            </Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default ClientSignin;