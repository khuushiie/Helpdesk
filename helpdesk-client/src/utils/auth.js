const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const signUp = async (name, username, email, password, role) => {
    try {
        const payload = { name, username, email, password, role };
        console.log('Sending signup request:', payload);
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Signup failed');
        return data;
    } catch (error) {
        console.error('Signup fetch error:', error);
        throw new Error(error.message);
    }
};

export const signIn = async (email, password) => {
    try {
        const payload = { email, password };
        console.log('Sending signin request:', payload);
        const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Signin failed');
        return data;
    } catch (error) {
        console.error('Signin fetch error:', error);
        throw new Error(error.message);
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/forgotpassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Forgot password failed');
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token provided');
        const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch profile');
        return data;
    } catch (error) {
        console.error('Get profile fetch error:', error);
        throw new Error(error.message);
    }
};

export const updateProfile = async (username, email, name, currentPassword, newPassword, role) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token provided');
        const payload = { username, email, name, currentPassword, newPassword, role };
        console.log('Sending update profile request:', payload);
        const response = await fetch(`${API_BASE_URL}/api/auth/update-profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to update profile');
        return data;
    } catch (error) {
        console.error('Update profile fetch error:', error);
        throw new Error(error.message);
    }
};