import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
    Button,
    TableBody,
} from "@mui/material";
import axios from "axios";

export default function Cor() {
    // const username = useSelector((state) => state.username);
    const Location = useLocation();
    const username = Location.state || {};
    const [kuras, setKuras] = React.useState([]);
    const [order, setOrder] = React.useState([]);
    const [displayorder, setDisplayOrder] = React.useState([]);
    const [fetched, setFetched] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [kphone, setKphone] = React.useState("");


    const arr = username.username.split(".");
    const name = arr[0];
    const surname = arr[1];
    const onClick = (props) => {
        console.log("clicked")
        axios({
            method: 'post',
            url: "http://127.0.0.1:8000/couriersms",
            headers: {}, 
            data: {
            id : props.courierID,
            iin: props.iin, 
            name: props.name,
            code: props.code,
            phone: kphone,
            }
        }).then((result)=>{
            // alert('Курьер добавлен. Имя пользователя: ' + username + ' Пароль: ' + password);
        }).catch((error)=>{
            console.log(error)
        })
    }
    const loadKurs = async () => {
        const result = await axios.get("http://127.0.0.1:8000/courier");
        setKuras(result.data);
        // console.log(result.data)
      };

    const loadOrders = async () => {
    const result = await axios.get("http://127.0.0.1:8000/order");
    setOrder(result.data);
    console.log(result.data)
    };

    useEffect(() => {
        loadKurs();
        loadOrders();
        // setFetched(true)
    }, []);

    useEffect(() => {
        // loadKurs();
        if(kuras.length != 0) {
            setFetched(true)
        }
        
    }, [kuras]);

    useEffect(() => {
        // loadKurs();
        if(order.length > 0) {
            showOrders();
        }
        
    }, [order]);

    useEffect(() => {
        if(fetched) {
            console.log("fetched")
            console.log(kuras)
            courierId();
            console.log("id ",id);
        }
    }, [fetched]);

    const courierId = () => {
        console.log("courierId")
        console.log(kuras)
        kuras.forEach((kura) => {
            if (kura.name.toLowerCase() === name && kura.surname.toLowerCase() === surname) {
                console.log(kura.courierID)
                setId(kura.courierID)
                setKphone(kura.phone)
                console.log("phoneee", kura.phone
                )
            }
        });
    }
    const showOrders = () => {
        console.log("showOrders")
        console.log(order)
        order.forEach((ord) => {
            if (ord.courierID === id) {
                console.log("idwgx", id)
                setDisplayOrder([...displayorder , ord])
            }
        });

    }
    
    console.log("displayorder",displayorder)
    return (
    <Paper>
        {displayorder.map((order) => {
           return (
            <Grid sx={{ margin: "10px", padding: "10px" }} container spacing={1}>
            <Grid item xs={6}>
              <Typography>ИИН</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{order.clientName}</Typography>
            </Grid>
    
            <Grid item xs={6}>
              <Typography>Имя</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {/* {submittedValue.name} */}
                </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Фамилия</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>zxc</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>Документ</Typography>
            </Grid>
            <Grid item xs={6}>
              {/* {loading ? <h4>Загружается</h4> :  */}
              {/* {appInfo.data.serviceType.nameRu} */}
            </Grid>
            <Grid item xs={6}>
              <Typography>Адрес доставки</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography sx={{ width: "80%" }}>address</Typography>
            </Grid>
    
            {/* {isChecked && ( */}
             
            {/* )} */}
            <Grid sx={{ pl: "100px" }} item xs={9}>
              <Typography>Я соглашаюсь на дальнейшую обработку данных</Typography>
            </Grid>
            <Grid item xs={3}>
              <Checkbox />
            </Grid>
    
            <Grid item xs={4}>
              <Button
                onClick={() => {
                //   getClient();
                }}
                color="error"
                variant="outlined"
              >
                Отменить
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button 
             onClick={() => onClick(order)}
               color="success" variant="contained">
                Принять
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={() => {
                //   getClient();
                }}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        )})}
      
    </Paper>


    )
}