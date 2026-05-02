const express = require("express");
const app = express();
const router = require("./router/router");
const bodyParser = require("body-parser");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const path = require("path");
const cors = require("cors");
app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors());

let dbInfo = {
  // DB 정보
  host: "localhost",
  port: "3306",
  database: "yourday",
  user: "mysql",
  password: "1234"
};

let SMS = new MySQLStore(dbInfo);

app.use(
  session({
    secret: "smart",
    resave: false,
    saveUninitialized: true,
    store: SMS,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(3001, () => {
  console.log("Server is running. Port: 3001")
});