const express = require('express');
const app = express();
const port = 3003;
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://gajiyasir_db_user:LBiOMnCSD9Uv2Xvu@tweeta0.u3w9zut.mongodb.net/?retryWrites=true&w=majority&appName=tweeta0'
  )
  .then(() => {
    console.log('the bluetooth device is connected all successfully');
  })
  .catch((error) => {
    console.log('the bluetooth device is not connected ' + error);
  });

const server = app.listen(port, () => console.log('yo ' + port));

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.get('/', middleware.requireLogin, (req, res, next) => {
  var payload = {
    pageTitle: 'Home',
  };

  res.status(200).render('home', payload);
});
