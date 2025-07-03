const express = require('express');
const jwt = require('jsonwebtoken');
const Ticket = require('../models/Ticket');
const User = require('../models/User');
const router = express.Router();

// Middleware to verify JWT
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Get tickets (no auth for testing)
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('createdBy', 'username email');
        res.json(tickets);
    } catch (error) {
        console.error('Get tickets error:', error);
        res.status(500).json({ message: 'Server error: Failed to fetch tickets' });
    }
});

// Get dashboard stats (no auth for testing)
router.get('/stats', async (req, res) => {
    try {
        const totalTickets = await Ticket.countDocuments();
        const openTickets = await Ticket.countDocuments({ status: 'Open' });
        const closedTickets = await Ticket.countDocuments({ status: 'Closed' });
        const pendingTickets = await Ticket.countDocuments({ status: { $in: ['In Progress', 'On Hold'] } });
        res.json({
            totalTickets,
            openTickets,
            closedTickets,
            pendingTickets,
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ message: 'Server error: Failed to fetch stats' });
    }
});

// Create a ticket (no auth for testing)
router.post('/', async (req, res) => {
    try {
        const { subject, category, priority, description, department, type, attachment } = req.body;
        if (!subject || !category || !priority || !description) {
            return res.status(400).json({ message: 'Missing required fields: subject, category, priority, description' });
        }
        const validCategories = ['Hardware', 'Software', 'Network', 'Access', 'UI'];
        const validPriorities = ['Low', 'Medium', 'High'];
        const validTypes = ['Bug', 'Issue', 'Request', 'Support'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category' });
        }
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ message: 'Invalid priority' });
        }
        if (type && !validTypes.includes(type)) {
            return res.status(400).json({ message: 'Invalid type' });
        }
        const ticketCount = await Ticket.countDocuments();
        const ticketId = `T${String(ticketCount + 1).padStart(3, '0')}`;
        const ticket = new Ticket({
            ticketId,
            subject,
            category,
            priority,
            description,
            department,
            type,
            attachment,
            createdBy: null,
            status: 'Open',
        });
        await ticket.save();
        res.status(201).json({ message: 'Ticket created successfully', ticket });
    } catch (error) {
        console.error('Create ticket error:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: `Validation error: ${error.message}` });
        }
        res.status(500).json({ message: 'Server error: Failed to create ticket' });
    }
});

// Update a ticket (no auth for testing)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { subject, category, priority, description, department, type, inCharge, attachment, teamName, teamMembers } = req.body;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        ticket.subject = subject || ticket.subject;
        ticket.category = category || ticket.category;
        ticket.priority = priority || ticket.priority;
        ticket.description = description || ticket.description;
        ticket.department = department || ticket.department;
        ticket.type = type || ticket.type;
        ticket.inCharge = inCharge || ticket.inCharge;
        ticket.attachment = attachment || ticket.attachment;
        ticket.teamName = teamName || ticket.teamName;
        ticket.teamMembers = teamMembers || ticket.teamMembers;
        await ticket.save();
        res.json({ message: 'Ticket updated successfully', ticket });
    } catch (error) {
        console.error('Update ticket error:', error);
        res.status(500).json({ message: 'Server error: Failed to update ticket' });
    }
});

// Close a ticket (no auth for testing)
router.put('/:id/close', async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, remarks } = req.body;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        if (rating !== undefined && (rating < 0 || rating > 5)) {
            return res.status(400).json({ message: 'Rating must be between 0 and 5' });
        }
        ticket.status = 'Closed';
        if (rating !== undefined) {
            ticket.rating = rating;
        }
        if (remarks) {
            ticket.rejectionReason = remarks; // Store remarks as rejectionReason for consistency
        }
        await ticket.save();
        res.json({ message: 'Ticket closed successfully', ticket });
    } catch (error) {
        console.error('Close ticket error:', error);
        res.status(500).json({ message: 'Server error: Failed to close ticket' });
    }
});

// Create a team for a ticket (no auth for testing)
router.post('/:id/team', async (req, res) => {
    try {
        const { id } = req.params;
        const { teamName, teamMembers } = req.body;
        if (!teamName || !teamMembers || !Array.isArray(teamMembers)) {
            return res.status(400).json({ message: 'Missing or invalid teamName or teamMembers' });
        }
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        ticket.teamName = teamName;
        ticket.teamMembers = teamMembers;
        ticket.status = 'In Progress';
        await ticket.save();
        res.json({ message: 'Team created successfully', ticket });
    } catch (error) {
        console.error('Create team error:', error);
        res.status(500).json({ message: 'Server error: Failed to create team' });
    }
});

// Approve a ticket (no auth for testing)
router.post('/:id/approve', async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        ticket.status = 'In Progress';
        await ticket.save();
        res.json({ message: 'Ticket approved successfully', ticket });
    } catch (error) {
        console.error('Approve ticket error:', error);
        res.status(500).json({ message: 'Server error: Failed to approve ticket' });
    }
});

// Reject a ticket (no auth for testing)
router.post('/:id/reject', async (req, res) => {
    try {
        const { id } = req.params;
        const { rejectionReason } = req.body;
        const ticket = await Ticket.findById(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        ticket.status = 'Rejected';
        ticket.rejectionReason = rejectionReason || 'No reason provided';
        await ticket.save();
        res.json({ message: 'Ticket rejected successfully', ticket });
    } catch (error) {
        console.error('Reject ticket error:', error);
        res.status(500).json({ message: 'Server error: Failed to reject ticket' });
    }
});

module.exports = router;