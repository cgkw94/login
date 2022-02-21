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

//login

//generate jwt token
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
}

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username.toLowerCase(),
    ]);

    const userDetails = user.rows[0];

    if (userDetails) {
      const validPass = await bcrypt.compare(password, userDetails.password);

      if (validPass) {
        const user = {
          id: userDetails.id,
        };
        const accessToken = generateAccessToken(user);

        res.json({ jwt: accessToken });
      } else {
        res.json("Incorrect Password");
      }
    } else {
      res.status(404).json("Username not found");
    }
  } catch (err) {
    console.error(err.message);
  }
});

//register
app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, admin } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `
      INSERT INTO users (username, password, admin)
      VALUES($1, $2, $3)
      RETURNING *
      `,
      [username.toLowerCase(), hash, admin]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    res.json(err.message);
  }
});

//get user details
app.get("/user", auth, async (req, res) => {
  try {
    const { id } = req.user;

    const user = await pool.query(
      "SELECT username, admin FROM users WHERE id = $1",
      [id]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5002, () => {
  console.log("server has started on port 5002");
});
