const express = require("express");
const env = require('./config/environment');
const logger = require('morgan');

const cookieParser = require("cookie-parser");
const app = express();
require('./config/view_helpers')(app);
const port = process.env.port;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//Setup the chat server to work with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
const cors = require('cors');

console.log("Chat server is listening on port 5000");

const path = require('path');

if (env.name == "development") {
  app.use(
    sassMiddleware({
      src: path.join(__dirname, env.assest_path, 'scss'),
      dest: path.join(__dirname, env.assest_path, 'css'),
      debug: true,
      outputStyle: "extended",
      prefix: "/css",
    })
  );
}

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.assest_path));
//Make the uploades path avaialable to the users
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

//extract styles and scripts from sub page into the layout

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "codeial",
    //ToDo change the screen
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: (1000 * 60 * 100),
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost:27017/codeial",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error:${err}`);
  }
  console.log(`Successfully runnin on port:${port}`);
});
