import express from 'express'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import { engine } from 'express-handlebars'


// Instancia servidor

const app = express()

// Logger para Servidor
app.use(morgan("dev"))
// middleware para subir archivos
app.use(fileUpload())
// middleware para aceptar json
app.use(express.json())
// Archivos estáticos
app.use(express.static('static'))
app.use('/photos', express.static('photos')); // Servir fotos desde la carpeta 'photos'

// Motor de vistas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Ruta para la página principal
app.get('/', (req, res) => {
   res.render('home'); // Renderizar home.handlebars utilizando main.handlebars como layout
});

app.listen(3000, () => {console.log("App escuchando el puerto 3000")})