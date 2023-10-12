const express = require("express");
const morgan = require("morgan"); //4

//*routes 
const productRouter = require("./routes/products.route"); //3



const app = express();

app.use(express.json()); //2
app.use(morgan('dev'));//5

const getTimeRequest = (req, res, next) => {
  const date = new Date();
  req.requesTime = date;
  next();
} 

app.use(getTimeRequest);

app.use("/api/v1/products", productRouter); //4


module.exports = app; //6





//==============================================================================================
// 2.el metodo use nos sirve para utilizar middlewares y con ese (express.json()) express va aceptar todo lo que venga en formato JSON
// 3. constante donde esta el archivo que tiene todas las rutas
// 4. llamamos al archivo donde estan las rutas relacionada con todos los empoints de los productos que estan en el productoc.route
//4. una ves isntalado importamos morgan
//5 antes de las rutas por debajo express.json() lo llamamos y dentro le colocamos 'dev'
//6 exportamos el app