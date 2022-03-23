require('dotenv').config()
const express= require('express');
const app = express()
const mongoose = require('mongoose')
const jwt= require('jsonwebtoken')
const cors= require("cors")

app.use( cors())

mongoose.connect(process.env.DatabaseURL, {useNewUrlparser: true});
const db= mongoose.connection;


db.on('error', (error)=> console.error(error));
db.once('open', ()=> console.log('Connected to database'))

app.use(express.json())
const userRouter= require('./Routes/userRoutes');
const flightRouter= require('./Routes/flightRoutes');

app.use('/users', userRouter)
app.use('/flights', flightRouter)
// API routes
app.get("/", (req, res) => {
    res.send({
      message: "Welcome to the Affordable flights API"
    });
  });
  app.set("Port", process.env.PORT||8000)

  app.listen(app.get("Port"), (server) => {
    console.info(`Server listen on port ${app.get("Port")}`);
    console.info("Press CTRL + C to close the server");
  });