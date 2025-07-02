import React, { useState } from 'react';
import '../styles/userprofile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const handleStarClick = (index) => {
        setRating(index + 1);
    };

    const handleSubmit = () => {
        alert(`Feedback submitted:\n${feedback}\nRating: ${rating} stars`);
        setFeedback('');
        setRating(0);
    };

    return (
        <div className="userprofile-container">
            <h2 className="mb-4 text-center">User Profile</h2>

            <div className="profile-wrapper p-5 rounded d-flex gap-4 flex-wrap justify-content-center">

                <div className="profile-card position-relative p-4 rounded shadow">
                    <Link className="edit-icon-top-right" to="/edit-profile"><i class="fa-solid fa-file-pen"></i></Link>

                    <div className="profile-image-wrapper text-center mb-3">
                        <img
                            src="https://i.ibb.co/9vTXN9K/profile-circle.png"
                            alt="Profile"
                            className="profile-image rounded-circle"
                        />
                    </div>

                    <div className="profile-details text-start">
                        <p><strong>Username:</strong> John Doe</p>
                        <p><strong>Contact:</strong> +91-9999999999</p>
                        <p><strong>Email:</strong> john@example.com</p>
                        <p><strong>Department:</strong> IT</p>
                    </div>
                </div>

                <div className="feedback-card p-4 rounded shadow">
                    <h5>Give Feedback</h5>
                    <textarea
                        rows="4"
                        className="form-control mb-3"
                        placeholder="Write your feedback here..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <div className="mb-3">
                        {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={`star-icon ${i < rating ? 'active' : ''}`}
                                onClick={() => handleStarClick(i)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-dark" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
