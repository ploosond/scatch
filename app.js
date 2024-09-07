const express = require("express");
const app = express();
const connectDB = require("./config/mongooseConnection");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");
const indexRouter = require("./routes/index");

require("dotenv").config();

// Connect to the database
connectDB();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(flash());

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the view engine
app.set("view engine", "ejs");

// Define route handlers
app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:3000`);
});

// TO DO
// remove flash package and it usage
