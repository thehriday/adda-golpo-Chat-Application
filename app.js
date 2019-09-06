const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@blog-site-lxobl.mongodb.net/project_name`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
