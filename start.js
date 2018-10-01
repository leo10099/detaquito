// ! Cargar variables de entorno

require('dotenv').config();

// ! Cargar config de la aplicación

const express = require('express');
const path = require('path');
const app = require('./app');

// ! Conectar a la BBDD

const mongoose = require('mongoose');
mongoose.connect(
  process.env.MLABDDBB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`⛔ → ${err.message}`);
});

// ! Servir cliente

// Producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build/'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// Desarrolo
app.set('port', process.env.PORT || 5555);
const server = app.listen(app.get('port'), () => {
  console.log(` ✅  Servidor corriendo en puerto ${server.address().port}`);
});
