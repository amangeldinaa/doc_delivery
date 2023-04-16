import { React, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Typography,
  Grid,
  Checkbox,
  TextField,
  TableRow,
  Table,
  TableCell,
  TableHead,
  TableBody,
} from "@mui/material";
import qs from "qs";
import Button from "@mui/material/Button";
import clientInfo from "./ClientInfo.json";

function Courier() {
  const [info, setInfo] = useState({
    iin: "",
    lastName: "",
    firstName: "",
  });
  const [item, setItem] = useState("");
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const [iin, setIin] = useState("");
  const [showKura, setshowKura] = useState(false);
  const [isErr, setisErr] = useState(false);
  const [kuras, setKuras] = useState([]);
  const location = useLocation();
  const [appInfo, setappInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const lst = {
    "002241054097": "860904350504",
    "002241054795": "930823300880",
    "002241054954": "900319450997",
    "002241055082": "950905451464",
    "002241055257": "000430000049",
    "002241055387": "921123351335",
    "002241055659": "960217351422",
    "002241055886": "860729351086",
    "002241056742": "830730300232",
  };
  const apiEndPoint = "http://127.0.0.1:8000/courier"
  const loadAppInfo = async () => {
    var appNum;
    for (var key in lst) {
      if (lst[key] === submittedValue.iin) {
        appNum = key;
        break;
      }
    }
    await axios
      .get(
        `http://89.218.80.61/vshep-api/con-sync-service?requestId=${appNum}&requestIIN=${submittedValue.iin}&token=eyJG6943LMReKj_kqdAVrAiPbpRloAfE1fqp0eVAJ-IChQcV-kv3gW-gBAzWztBEdFY`
      )
      .then((res) => {
        setappInfo(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //   const iin = [
  //     "860904350504",
  //     "930823300880",
  //     "900319450997",
  //     "950905451464",
  //     "000430000049",
  //     "921123351335",
  //     "960217351422",
  //     "860729351086",
  //     "830730300232",
  //   ];

  const loadKurs = async () => {
    const result = await axios.get(apiEndPoint);
    setKuras(result.data);
  };

  const onClick = async (e) => {
    e.preventDefault();
    console.log(iin);
    if (isChecked) {
      await getToken();
    } else {
      setshowKura(true);
    }
loadKurs();
  };
  const onSelect = async (props) => {
    axios({
      method: 'post',
      url: "http://127.0.0.1:8000/order",
      headers: {}, 
      data: {
            "clientName": submittedValue.firstName,
            "clientSurname": submittedValue.lastName,
            "dependent": "none",
            "orderName": appInfo.data.serviceType.nameRu,
            "conBranch": appInfo.data.organization.nameKz,
            "conAddress": appInfo.data.organization.code,
            "time": appInfo.data.statusDate,
            "iin": submittedValue.iin,
            "code": "12",
            "courierID": props+1,
            
      }
  }).then((result)=>{
    console.log(result)
      // alert('Курьер добавлен. Имя пользователя: ' + username + ' Пароль: ' + password);
  }).catch((error)=>{
      console.log(error)
  })
  };
  const kur = [
    { name: "Zangar", service: "GLovo", iin: "1" },
    { name: "Batyr", service: "Yandex", iin: "2" },
  ];
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

    await axios(config)
      .then((response) => {
        setToken(response.data.access_token);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getClient = async () => {
    const url = "http://hakaton-fl.gov4c.kz/api/persons/" + iin + "/";
    await loadAppInfo();
    const config = {
      method: "get",
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios(config)
      .then((response) => {
        setisErr(false);
        setInfo(response.data);
        setshowKura(true);
        setAddress(response.data.regAddress.address);
      })
      .catch((error) => {
        setisErr(true);
        console.error(error);
      });
  };
  const { submittedValue } = location.state || {};
  console.log(submittedValue);
  useEffect(() => {
    loadAppInfo();
    if (token.length) {
      getClient();
    }
  }, [token]);
  const handleChange = (e) => {
    setisChecked(e.target.checked);
  };

  return (
    <Paper>
      <Grid sx={{ margin: "10px", padding: "10px" }} container spacing={1}>
        <Grid item xs={6}>
          <Typography>ИИН</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{submittedValue.iin}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>Имя</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{submittedValue.firstName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Фамилия</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{submittedValue.lastName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Документ</Typography>
        </Grid>
        <Grid item xs={6}>
          {loading ? <h4>Загружается</h4> : appInfo.data.serviceType.nameRu}
        </Grid>
        <Grid item xs={6}>
          <Typography>Адрес доставки</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            sx={{ width: "80%" }}
            value={submittedValue.regAddress.address}
          ></TextField>
        </Grid>
        <Grid item xs={9}>
          <Typography>Заказ примет третье лицо</Typography>
        </Grid>
        <Grid item xs={3}>
          <Checkbox onChange={handleChange} />
        </Grid>
        {isChecked && (
          <>
            <Grid item xs={6}>
              <Typography>ИИН третьего лица</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="text"
                value={iin}
                onChange={(e) => setIin(e.target.value)}
                sx={{ width: "80%" }}
                label="Введите иин"
                error={isErr ? true : false}
              />
            </Grid>
          </>
        )}
        <Grid sx={{ pl: "100px" }} item xs={9}>
          <Typography>Я соглашаюсь на дальнейшую обработку данных</Typography>
        </Grid>
        <Grid item xs={3}>
          <Checkbox />
        </Grid>

        <Grid item xs={4}>
          <Button
            onClick={() => {
              getClient();
            }}
            color="error"
            variant="outlined"
          >
            Отменить
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button onClick={onClick} color="success" variant="contained">
            Показать куръерские службы
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            onClick={() => {
              getClient();
            }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
      {showKura && (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Имя клиента</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Служба доставки</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kuras.map((item, index) => {
                return (
                  <TableRow key={item.iin}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>
                      <Button onClick={() => onSelect(index)}>
                        Выбрать
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Paper>
  );
}

export default Courier;