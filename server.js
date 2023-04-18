// const express = require('express');

// const app=express();

// app.use(express.json()) helps in manipulating incoming data

// app.get('/', (req,res)=>{
//     res.status(200).send("hello From Abhirajkar Bajpai");
// });

// const port =3000;

// app.listen(port, ()=>{
//     console.log(`App running on the Port : ${port}...`);
// })
const dotenv = require("dotenv");
const mongoose = require('mongoose');


dotenv.config({ path: "./config.env" }); //-->read file from path and save variables in nodejs environment variable
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// app.get("/", (req, res) => {
//   res.status(200).send("hello From Abhirajkar Bajpai");
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
