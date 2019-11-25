const express = require('express');
const cors = require('cors')
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// Routes
app.use(require('./routes/index'));

//app.listen(3000);
const PORT = process.env.PORT || 3000;
app.listen(PORT);

  
  process.on('unhandledRejection', error => {
    throw new Error(error);


  });
