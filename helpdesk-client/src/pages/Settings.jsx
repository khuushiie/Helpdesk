import React, { useState } from 'react';
import '../styles/settings.css';

const SettingsPage = () => {
    const [activeOption, setActiveOption] = useState('');

    const handleToggle = (option) => {
        setActiveOption((prev) => (prev === option ? '' : option));
    };

    return (
        <div className="container py-4">
            <h2 className="fw-bold mb-4">Settings</h2>

            <div className="card mb-3">
                <div className="card-header fw-semibold" onClick={() => handleToggle('general')} style={{ cursor: 'pointer' }}>
                    General
                </div>
                {activeOption === 'general' && (
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Language</li>
                        <li className="list-group-item">Data Backup</li>
                    </ul>
                )}
            </div>

            <div className="card mb-3">
                <div className="card-header fw-semibold" onClick={() => handleToggle('connect')} style={{ cursor: 'pointer' }}>
                    Connect To
                </div>
                {activeOption === 'connect' && (
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">GoDash</li>
                        <li className="list-group-item">SuperController</li>
                    </ul>
                )}
            </div>

            <div className="card mb-3">
                <div className="card-header fw-semibold" onClick={() => handleToggle('email')} style={{ cursor: 'pointer' }}>
                    Email
                </div>
                {activeOption === 'email' && (
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Enable SMTP</li>
                    </ul>
                )}
            </div>

            <div className="card mb-3">
                <div className="card-header fw-semibold" onClick={() => handleToggle('auth')} style={{ cursor: 'pointer' }}>
                    Authorization
                </div>
                {activeOption === 'auth' && (
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Edit Authorization</li>
                        <li className="list-group-item">Authority Level</li>
                    </ul>
                )}
            </div>

            <div className="card mb-3">
                <div className="card-header fw-semibold" onClick={() => handleToggle('notification')} style={{ cursor: 'pointer' }}>
                    Notification
                </div>
                {activeOption === 'notification' && (
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Enable Notification</li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;
