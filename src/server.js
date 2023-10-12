require('dotenv').config();
const app = require('./app');

const { db } = require("./database/config");

// 1 esto me autentica contra la base de datos
db.authenticate()
    .then(() => console.log("Database connected...🌠"))
    .catch((err) => console.log(err));

//2 me sincronizo a la base de datos
db.sync()
    .then(() => console.log("Database syncrhonized.. 🚀"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 3998;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT} 😎`);
});



