const express = require('express');
const { addEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/',protect, addEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id',protect, updateEvent);
router.delete('/:id',protect, deleteEvent);

module.exports = router;