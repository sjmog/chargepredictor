var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const kWhPerMile = req.kWhPerMile;
  const distancePerDay = req.distancePerDay;
  const chargingTimePerDay = req.chargingTimePerDay;
  const chargerVoltage = 1000;
  const chargerCurrent = 1000;
  const numberOfEvs = 1000;

  const calculator = new Calculator()
  res.render('index', { demand: calculator.run() });
});

module.exports = router;
