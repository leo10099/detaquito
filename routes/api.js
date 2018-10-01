const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: './temp/' });
const { catchErrors } = require('../middleware/errorHandlers');

// ! Controllers

// Config

const prodeConfigController = require('../components/prodeConfig/prodeConfigController');

router.get(
  '/api/fetch/config/round',
  catchErrors(prodeConfigController.getConfigRound)
);

// Users
const userController = require('../components/users/userController');

router.post(
  '/api/update/user/avatar',
  upload.single('avatar'),
  catchErrors(userController.editUserAvatar)
);

router.post('/api/update/user/data/', userController.editUser);

// Teams
const teamController = require('../components/teams/teamController');

router.get(
  '/api/fetch/team/names',
  catchErrors(teamController.getAllTeamsNames)
);

router.post(
  '/api/create/team',
  passport.authenticate('headerapikey', {
    session: false
  }),
  catchErrors(teamController.createTeam)
);

// Rounds
const roundController = require('../components/rounds/roundController');

router.get('/api/fetch/round/:round/', catchErrors(roundController.getRound));
router.get(
  '/api/fetch/round/played/:round',
  catchErrors(roundController.getPlayedRound)
);
router.patch('/api/update/round', catchErrors(roundController.updateRound));

// Predictions
const predictionController = require('../components/predictions/predictionController');

router.get(
  '/api/fetch/prediction/:round',
  catchErrors(predictionController.getUserPrediction)
);

router.post(
  '/api/create/prediction',
  catchErrors(predictionController.createPrediction)
);

// Scores
const scoreController = require('../components/scores/scoreController');

router.get(
  '/api/fetch/scores/:round/',
  catchErrors(scoreController.getUserResults)
);

// Tourneys
const tourneyController = require('../components/tourneys/tourneyController');

router.get(
  '/api/fetch/tourney/user/',
  catchErrors(tourneyController.getUserTourneys)
);

router.get(
  '/api/fetch/tourney/:_id',
  catchErrors(tourneyController.getTourneyData)
);

router.post(
  '/api/create/tourney',
  catchErrors(tourneyController.createTourney)
);

router.post(
  '/api/update/tourney/join',
  catchErrors(tourneyController.addUnconfirmedUser)
);

module.exports = router;
