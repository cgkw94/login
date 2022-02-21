require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
let cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
const { query } = require("express");

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
