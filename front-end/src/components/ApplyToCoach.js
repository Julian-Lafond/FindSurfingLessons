import React, { useState } from 'react';

export default function ApplyToCoach() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/coaches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Coach added:', data);

                // Set success message
                setSuccessMessage(`Coach ${data.first_name} ${data.last_name} added successfully!`);

                // Store the names in local storage
                localStorage.setItem('firstName', data.first_name);
                localStorage.setItem('lastName', data.last_name);

                // Optionally reset the form
                setFirstName('');
                setLastName('');
            } else {
                console.error('Error adding coach:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="apply-to-coach-container">
            <div className="apply-to-coach">
                <h1>Apply To Become A Surf Coach</h1>
                <h3>Post Your Own Free Coach Page</h3>
                <h3>Find New Surfing Students</h3>
                <h3>Teach Them at Your Own Convenience</h3>
                <h3>Get Paid Directly From Students</h3>
                <h3>Earn 100% of Lessons</h3>
            </div>
            <div className="form-box">
                <form onSubmit={handleSubmit}>
                    <div className="apply-to-coach-form">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input-field"
                        />
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
                {successMessage && <p>{successMessage}</p>}
            </div>
        </div>
    );
}
