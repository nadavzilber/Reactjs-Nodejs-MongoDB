const express =  require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//IMPORT ROUTES
const authRoute = require('./routes/auth');
const videosRoute = require('./routes/videos');

dotenv.config();

//CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECT,
  {useNewUrlParser: true, useUnifiedTopology: true},
  ()=> console.log('connected to DB')
);

//MIDDLEWARE
app.use(express.json());

//ROUTE MIDDLEWARES
app.use('/user',authRoute);
app.use('/videos',videosRoute)

const port = process.env.PORT || 3001
app.listen(port, () => console.log(`Express server is running on port ${port}...`));
