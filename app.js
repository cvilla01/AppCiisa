
var ibmdb = require('ibm_db');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

// Vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Parseo de los resultados
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Estaticos
app.use(express.static(path.join(__dirname ,'node_modules/angular' )));
app.use(express.static(path.join(__dirname ,'node_modules/ibmiotf/dist' )));

app.use('/', routes);

// Catch
/*
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



//Error Handler -- Errores traidos desde Watson IoT
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/
app.post('/signup', function(req, res) {

var dato = req.body.firstname;

ibmdb.open("DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;UID=pwf56263;PWD=hb-1z5zdf4cpskvh;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
  if (err) return console.log(err);
  conn.query(`insert into PWF56263.CIISA (ID) values ('${dato}')`, function (err, data) {
    if (err) console.log(err);
    else console.log(data);
 
    conn.close(function () {
      console.log('done');
    });
  });


});

console.log(dato);
res.sendFile(__dirname+'/views/index.ejs');
});

app.listen(3000, function(){
    console.log("Listos en el puerto 3000");
});
module.exports = app;


