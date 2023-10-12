const express = require("express"); //1

//*routes controlador
const productController = require("./../controllers/product.controller");

//*middlewares
const validationMiddleware = require("./../middlewares/validation.middleware"); //5

const router = express.Router(); //2

router
  .route("/")
  .get(productController.findProducts) //3
  .post(validationMiddleware.validProduct, productController.createProducts); //6

router
  .route("/:id")
  .get(productController.findOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router; // 4













//===============================================

// 1. importamos exporess para las funcionalidades
// 2. la constante router viene por express.Router todas las funcionalidades del routing viene por express.route
// 3.  colocamos router por que es la funcianlidad de la variable router .get por que es el metodo get con el nombre de la ruta "/" o "/:id" y le mandamos el callback que es el nombre de la funcion del producto eso hacemos para todas las rutas.
// 4. y exportamos con module.exports y el nombre de router.
// 5. importamos validationMiddleware que viene de la require y viene de la carpeta middlewares
//  6.validamos lo que venga de req.body con ese middleware de validProduct que viene de validationMiddleware
