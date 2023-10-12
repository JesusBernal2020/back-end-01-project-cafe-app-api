const Product = require("../models/product.model");

//* buscar varios productos
exports.findProducts = async(req, res) => { // 3
  try {
    const products = await Product.findAll({
      where: {
        status: true,
      },
    });
    return res.status(200).json({
      status: "Success",
      message: "Products retrieved successfully",
      result: products.length,
      products,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'Something wetn very wrong!'
    });
  }
};
 

//*crear un producto
exports.createProducts = async (req, res) => {
  try {
    const { name, ingredients, image, description, price, quantity } = req.body; //1

    const product = await Product.create({
      //4
      name,
      ingredients,
      image,
      description,
      price,
      quantity,
    });

    return res.status(201).json({
      status: "Success",
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'something weny very wrong!', 
    });
  }
};

//*buscar un producto con el id
exports.findOneProduct = async (req, res) => {
  try {
    const { id } = req.params; //2
    const product = await Product.findOne({ //5
      where: {
        id,
        status: true,
      }
    });

    if (!product) {//6
      return res.status(404).json({
        status: 'error',
        message: `product with id ${id} not found!`
      });
    }

    return res.status(200).json({//7
      status: 'success',
      message: 'product retrived successfully',
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "something weny very wrong!",
    });
  }
};

//*editar un producto pornel id
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params; //8

    const { quantity, price, isNew } = req.body;//9

    const product = await Product.findOne({//10
      where: {
        id,
        status:true,
      }
    });

    const productUpdate = await product.update({//12
      quantity,
      price,
      isNew
    });

    if (!product) {
      return res.status(404).json({//11
        status: "error",
        message: `product with id ${id} not found!`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: "Product update successfully!",
      product: productUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "someting went very wrong!!",
    });
  }
};

//*borrar un producto por el id
exports.deleteProduct = async(req, res) => {
  try {
    const { id } = req.params;//13

    const product = await Product.findOne({//14
      where: {
        id,
        status: true,
      },
    });

    if (!product) {//15
      return res.status(404).json({
        status: 'error',
        message: `product with id ${id} not fountd!!`,
      });
    }

    await product.update({ status: false });//16

    res.status(200).json({
      status: 'succes',
      message: "product deleted successfully!"
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'fail',
      message: 'someting went very wrong!!'
    });
  }
};











//=====================================================================================================================

// 1. informacion del cliente viene por el body.
// 2. id viaja por la requeste y los parametros.
// 3. exporttamos con la palabra reservada exports. y el nombre de la funcion
// 4. enviamos los nombre que viene por la req.body
//5. buscar el producto con dicho id y status true es decir que este activo
//6 valido si no existe el producto para enviar un error
//7 si exite se ejecuts esp y se envia la respuesta al cliente
//8 me traigo el id del producto a actualizar
//9 me traigo los datos actualizar
//10 busco el producto actualizar
//11 validar si el prducto existe, encaso de que no enviar un error
//12 actualizar el producto encontrado
//13 me traigo el id del producto a eliminar
//14 busco el producto  a eliminar
//15 validar si el producto existe, encaso de que no enviar un error
//16 eliminar el producto (sofdelete)