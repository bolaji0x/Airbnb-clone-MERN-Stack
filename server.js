const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
require('express-async-errors');

const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const cors = require('cors')


// hello
// db and authenticateUser
const connectDB = require('./db/connect.js');

// routers
const authRouter = require('./routes/authRoutes.js');
const listingRouter = require('./routes/listingRoutes.js')
const orderRouter = require('./routes/orderRoutes');


// middleware
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const {auth} = require('./middleware/auth.js');

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// only when ready to deploy 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser(process.env.JWT_SECRET));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/listings', listingRouter)
app.use('/api/v1/orders', orderRouter);

// only when ready to deploy

/*
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build', 'index.html'));
}); 

*/
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
