const express = require('express');
const app = express();
const port = 8000;

app.listen(port , function(err){
    if(err){
        // console.log('Error' , err);
        console.log(`Error in running thr server: ${err}`);
    }
    console.log(`Server is running om port : ${port}` );
})