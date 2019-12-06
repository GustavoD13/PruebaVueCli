const express = require('express');
const cors = require('cors')
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({ origin: true, credentials: true  }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "HEAD, OPTIONS, GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Routes
app.use(require('./routes/index'));

//app.listen(3000);
const PORT = process.env.PORT || 3000;
app.listen(PORT);

  
  process.on('unhandledRejection', error => {
    throw new Error(error);


  });