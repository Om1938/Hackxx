const router = require('express').Router();

const SanitizeBody = require('../../_helper/SanitizeBody');
const { addStudent } = require('./StudentDAL');

router.post('/', (req, res, next) => {
  addStudent(req.body)
    .then(resp => {
      res.json(resp);
    })
    .catch(next);
});

module.exports = router;
