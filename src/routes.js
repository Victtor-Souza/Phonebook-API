const express = require('express');

const sessionController = require('./controllers/SessionController');
const userController = require('./controllers/UserController');
const contactController = require('./controllers/ContactsController');
const multer = require('multer');
const uploadConfig = require('./config/upload');



const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/session', sessionController.create);

routes.get('/contact', contactController.list);
routes.get('/contact/:id', contactController.getById);
routes.post('/contact', upload.single('avatar'), contactController.create);
routes.put('/contact/:id', upload.single('avatar'),contactController.update);
routes.delete('/contact/:id', contactController.delete);


routes.get('/user', userController.list);
routes.put('/user/:id', userController.update);
routes.delete('/user/:id', userController.delete);
routes.post('/user', userController.create);

module.exports = routes;