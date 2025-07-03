const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const getProfile = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateProfile = async (token, userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update profile');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAllUsers = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserLogs = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/logs`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch logs');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getPerformanceStats = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/users/performance`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch performance stats');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};