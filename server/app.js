const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const helmet = require('helmet');
require('./db/mongoose');
const todoRouter = require('./routes/Todo');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
//Helmet helps you secure your Express apps by
// setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());
// app.use(require('compression'));
app.use(morgan('dev'));


app.use('/api', todoRouter);
// app.use('/todo/:id', require('./routes/Todo'))

app.get('/api',(req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    next();
})   


// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// }); 


//catch 404 Errors and forward them to error handeler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


//Error handler funciton
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    //Respond to  client 
    res.status(status).json({
        error: {
            message: error.message
        }
    });
});



//start  the server 
var port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Magic is happeing on port ${port}`))