const express = require('express');
const router = express.Router();
const Protected = require('../middleware/checkAdmin');
const { catchErrors } = require('../middleware/errorHandlers');

const prodeConfigController = require('../components/prodeConfig/prodeConfigController');
const matchController = require('../components/matches/matchController');
const roundController = require('../components/rounds/roundController');
const scoreController = require('../components/scores/scoreController');
// Config Fecha
router.get('/config-fecha', Protected, prodeConfigController.configRound);
router.post('/config-fecha', Protected, prodeConfigController.setConfigRound);

// Crear Partidos

router.get('/create-match', Protected, matchController.createMatchForm);
router.post('/create-match', Protected, matchController.createMatch);

// Crear Fecha

router.get('/create-round/', Protected, roundController.createRoundForm);
router.post('/create-round/', Protected, roundController.createRound);

// Guardar resultados de la fecha

router.post(
  '/input-round-results/',
  Protected,
  catchErrors(roundController.inputRoundResults)
);

router.get(
  '/input-round-results/:roundnum',
  Protected,
  roundController.inputRoundResultsForm
);

// Calcular los puntos de los usuarios de una fecha disputada
router.get(
  '/calc-round-scores/:round',
  Protected,
  catchErrors(scoreController.calcRoundScores)
);

module.exports = router;
