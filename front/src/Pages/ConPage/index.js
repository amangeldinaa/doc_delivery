import React, { useEffect } from 'react';
import {Box, Button, TextField, Typography} from '@mui/material';

const Con = () => {

  return (
    <div 
    // style={{backgroundColor:'#87CEFA'}}
    >
      <form >
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
              Введите код курьера
            </Typography>
          </div>

          <TextField
            // error={authenticated == 99 ? true : false}
            margin="normal"
            type="text"
            placeholder="Код курьера"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            {/* <Button type="submit" />
            
              Login
            </Button> */}
            <Button 
                style={{width: '60%', marginTop: 20}} 
                variant="contained" 
            >Ввести</Button>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Con;