const express= require('express');
const app =express();
const dotevn = require('dotenv');
dotevn.config();
const mongoConnect = require('./db/connection');
const router = require('./Routers/userRouter');
const authrouter = require('./Routers/authRouter');
// const path = require('path');
// const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');



app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoConnect();


app.use('/api', router);
app.use(router);
app.use(authrouter);

app.use('/uploads', express.static('uploads'));


app.listen(process.env.PORT,() =>{
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})
