//npm install hbs --save
//Para desinstalar un paquete:
//npm remove hbs

const express = require('express');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

var app = express();

app.use((req, res, next) => {
  res.render('maintenance.hbs');
  //No ponemos next, para que no se ejecute nada más.
});

//configuramos la ruta de los partials (por ejemplo el footer)
app.use(express.static(__dirname + '/public'));

//PAra registar middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.set('view engine', 'hbs');

//establecemos el motor de vistas, que en este caso va a ser hbs
// app.set('view engine', 'hbs');
//
// app.get('/', (req, res) => {
//   //res.send('Hola, para mi un café express!')
//   res.send({
//     name:'Modesto',
//     likes:[
//       'Dr Who',
//       'GoT',
//       'Sherlock'
//     ]
//   });
// });

app.get('/', (req, res) => {
  //res.send('Hola, para mi un café express!')
  res.render('home.hbs',{
    pageTitle: "Pagina Principal",
    message: 'Bienvenido!!!',
    //currentYear: new Date().getFullYear(),
  } );
});

app.get ('/about', (req, res)=>{
  //res.send('About page');
  res.render('about.hbs',{
    pageTitle: "Pagina de Ayuda",
    //currentYear: new Date().getFullYear(),
  } );
});

//Definimos el puesto por el que vamos a escuchar. Puerto por defecto de express --> 3000
app.listen(3000);
