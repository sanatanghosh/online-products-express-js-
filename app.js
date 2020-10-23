const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require ('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


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
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    // User.findById(1)
    //   .then(user => {
    //     req.user = user;
    //     next();
    //   })
    //   .catch(err => console.log(err));
    next();
  });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=> {
    app.listen(3000);
});


// app.listen(3000);