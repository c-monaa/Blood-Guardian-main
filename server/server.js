const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
// console.log(process.env.PORT)
const dbConfig = require('./config/dbConfig');
app.use(express.json());

const usersRoute = require('./routes/userRoute');
const inventoryRoute = require('./routes/inventoryRoutes');
const dashboardRoute = require('./routes/dashboardRoute');

app.use('/api/users', usersRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/dashboard', dashboardRoute);

// development config
const path = require("path");
_dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"/client/build")));
    app.get("*",(req,res) =>{
        res.sendFile(path.join(_dirname,"client","build","index.html"));
    });
} 

app.listen(port,()=> console.log(`NodeJS server started at ${port}`));