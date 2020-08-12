if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");

const mongoose = require("mongoose");

const autoIncrement = require("mongoose-auto-increment");

const expressLayouts = require("express-ejs-layouts");

const flash = require("connect-flash");

const session = require("express-session");

const passport = require("passport");

const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.use(methodOverride("_method"));

// app.use(expressLayouts);

PORT = process.env.PORT || 3000;

// Passport Config
require("./passport-config")(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Connect Flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Connect to Mongodb
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//MongoDb Connection
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to MongoDB"));

// Body Parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/homePage"));
app.use("/", require("./routes/login"));
app.use("/", require("./routes/submitPost"));
app.use("/", require("./routes/register"));
app.use("/", require("./routes/dashboard"));
app.use("/", require("./routes/editPost"));
app.use("/", require("./routes/deletePost"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
