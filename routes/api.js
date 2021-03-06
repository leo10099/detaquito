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

router.get(
  '/api/fetch/team/badge/:_id',
  catchErrors(teamController.getTeamBadge)
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

router.get(
  '/api/fetch/tourney/ranked/totalpoints/',
  catchErrors(tourneyController.getMembersRankedByTotalPoints)
);

router.get(
  '/api/fetch/tourney/ranked/lastround/',
  catchErrors(tourneyController.getMembersRankedByLastRound)
);

router.post(
  '/api/create/tourney',
  catchErrors(tourneyController.createTourney)
);

router.post(
  '/api/update/tourney/join',
  catchErrors(tourneyController.addUnconfirmedUser)
);

router.patch(
  '/api/update/tourney/reject',
  catchErrors(tourneyController.rejectUnconfirmedUser)
);

router.patch(
  '/api/update/tourney/name',
  catchErrors(tourneyController.editName)
);

router.patch(
  '/api/update/tourney/round',
  catchErrors(tourneyController.editRoundStart)
);

router.patch(
  '/api/update/tourney/accept',
  catchErrors(tourneyController.acceptUnconfirmedUser)
);

router.patch(
  '/api/update/tourney/leave',
  catchErrors(tourneyController.userLeave)
);
module.exports = router;
