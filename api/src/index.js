require('dotenv').config();
const express = require('express');
const app = express();
const moongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(bodyParser.json());

//Importa Rutes
const postsRoutes = require('./routes/tareas');

app.use('/tarea', postsRoutes)

//Conexion a la BD
moongoose.connect(process.env.BD_CONEXION, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, () => {
    console.log("Conectado a la BD!!")
})

//Puerto del Servidor
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Servidor en puerto ${port}`)
})