const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require('sequelize');
const route = require("./routes/route")
const app = express();
const dotenv = require("dotenv");

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',route)


const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
  });


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 

 app.listen(process.env.PORT || 3000,function(){
    console.log("Express app is listening on PORT ",(process.env.PORT || 3000))
 })

 