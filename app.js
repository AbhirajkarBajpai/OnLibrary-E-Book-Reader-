const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');
const bookRouter = require('./routes/bookRoutes');

const app = express();
 

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Serving static files
app.use(express.static(path.join(__dirname, 'public')));


// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser()); 



app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);


module.exports = app;
