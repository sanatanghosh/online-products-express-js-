const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");

// const mongoConnect = require("./util/database").mongoConnect;

// const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

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

// app.use((req, res, next) => {
//   User.findById("5f9bb2aea5198cd5d6fc0f4c")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch((err) => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://sanatanghosh:Sanatan1997@cluster0-expressjs.vsm7g.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

// mongoConnect(()=> {
//     app.listen(3000);
// });

// app.listen(3000);
