const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getTickets = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch tickets');
        return data;
    } catch (error) {
        console.error('Get tickets fetch error:', error);
        throw new Error(error.message);
    }
};

export const getTicketStats = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/stats`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch stats');
        return data;
    } catch (error) {
        console.error('Get stats fetch error:', error);
        throw new Error(error.message);
    }
};

export const createTicket = async (ticketData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create ticket');
        return data;
    } catch (error) {
        console.error('Create ticket fetch error:', error);
        throw new Error(error.message);
    }
};


export const createTeam = async (id, teamData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}/team`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teamData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to create team');
        return data;
    } catch (error) {
        console.error('Create team fetch error:', error);
        throw new Error(error.message);
    }
};

export const approveTicket = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to approve ticket');
        return data;
    } catch (error) {
        console.error('Approve ticket fetch error:', error);
        throw new Error(error.message);
    }
};

export const rejectTicket = async (id, rejectionReason) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}/reject`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rejectionReason }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to reject ticket');
        return data;
    } catch (error) {
        console.error('Reject ticket fetch error:', error);
        throw new Error(error.message);
    }
};

export const updateTicket = async (id, ticketData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update ticket');
        return data;
    } catch (error) {
        console.error('Update ticket fetch error:', error);
        throw new Error(error.message);
    }
};

export const closeTicket = async (id, rating, remarks) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/tickets/${id}/close`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, remarks }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to close ticket');
        return data;
    } catch (error) {
        console.error('Close ticket fetch error:', error);
        throw new Error(error.message);
    }
};