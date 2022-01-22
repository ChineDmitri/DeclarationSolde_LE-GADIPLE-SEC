const User = require('../models/User');

exports.create = (req, res, next) => {
  const user = new User({
    nom: req.body.nom,
    dateFDC_str: req.body.dateFDC_str,
    dateFDC_utc: req.body.dateFDC_utc,
    MonthSolde: req.body.MonthSolde,
  });

  user
    .save()
    .then(() => {
      res.status(200).json({ msg: 'OK!' });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
