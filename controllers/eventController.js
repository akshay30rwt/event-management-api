const Event = require('../models/Event');

const addEvent = async (req, res) => {
    try {
        const { title, description, date, location } = req.body;

        const event = new Event({ title, description, date, location, organizer: req.user.userId });
        await event.save();

        return res.status(201).json({
            message: 'Event added successfully',
            event
        });
    }
    catch(error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('organizer', 'name email');

        if(events.length === 0) {
            return res.status(404).json({
                message: 'There are no events'
            });
        }

        return res.status(200).json(events);
    }
    catch(error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('organizer', 'name email');

        if(!event) {
            return res.status(404).json({
                message: `There is no event with ID: ${id}`
            });
        }

        return res.status(200).json(event);
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location } = req.body;

        const event = await Event.findByIdAndUpdate(
            id, 
            { title, description, date, location, organizer: req.user.userId }, 
            { new: true, runValidators: true }
        );

        if(!event) {
            return res.status(404).json({
                message: `There is no event with ID: ${id}`
            });
        }
        return res.status(200).json({
            message: 'Event updated successfully',
            event
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);

        if(!event) {
            return res.status(404).json({
                message: `There is no event with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Event deleted successfully',
            event
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = { addEvent, getAllEvents, getEventById, updateEvent, deleteEvent };