const express = require('express')
// const { router } = require('../server')
const router = express.Router();
const hikeController = require('../controllers/hikeController');


// get all
router.post('/get-hikes', hikeController.getHikes, (req, res) => {
  return res.status(200).json(res.locals.hikes);
});

// get by :id
router.get('/:id', hikeController.getOneHike, (req, res) => {
  return res.status(200).json(res.locals.hike);
});

// update hike
router.put('/:id', hikeController.updateOneHike, (req , res) => {
  return res.status(200).send('redirect complete');
});

// create a hike
router.post('/', hikeController.createHike, (req, res) => {
  return res.status(200).json(res.locals.newHike);
});

// delete a hike
router.delete('/:id', hikeController.deleteOneHike,(req, res) => {
  return res.status(200).json(res.locals.deletedHike);
});


module.exports = router;












