const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoConnect = require('./db/connection');
const router = require('./Routers/userRouter');
const authrouter = require('./Routers/authRouter');
const cors = require('cors');

app.use(cors());  // Use CORS before defining any routes
app.use(express.static("../client"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoConnect();

app.use(router);
app.use(authrouter);

app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
