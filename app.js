const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require("./controllers/error");

// const mongoConnect = require("./util/database").mongoConnect;

const User = require("./models/user");

const MONGODB_URI = "mongodb+srv://sanatanghosh:Sanatan1997@cluster0-expressjs.vsm7g.mongodb.net/shop"



const app = express();

const store = new MongoDBStore ( {
  uri : MONGODB_URI,
  collection : 'sessions'
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require('./routes/auth');

// checking database connectivity

// const db = require ('./util/database');

// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result[0],result[1]);
// })
// .catch(err => {
//     console.log(err);
// })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById("5f9e9b5e86b3cbb29940f7b5")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODB_URI
  )
  .then((result) => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// mongoConnect(()=> {
//     app.listen(3000);
// });

// app.listen(3000);
