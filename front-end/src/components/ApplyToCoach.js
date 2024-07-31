import React, { useState } from 'react';

export default function ApplyToCoach() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCityName] = useState('')
    const [experience, setExperience] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [warning, setWarning] = useState('');

    const handleSubmit = async (event) => {     //Runs when the form is submitted
        event.preventDefault();     //Precents page from being refreshed


        // Trim the experience input to remove whitespace
        const experienceValue = experience.trim(); 
        if (!/^\d+$/.test(experienceValue)) { // Regular expression checks for positive integers only
            setWarning("Please enter a number for experience.") 
            return
        } else {
            setWarning('');
        }

        // Validation for firstName, lastName, and city (only letters)
        if (!/^[a-zA-Z]+$/.test(firstName)) {
            setWarning("First name can only contain letters.");
            return;
        }
        if (!/^[a-zA-Z]+$/.test(lastName)) {
            setWarning("Last name can only contain letters.");
            return;
        }
        if (!/^[a-zA-Z\s]+$/.test(city)) { // Allowing spaces for city names
            setWarning("City can only contain letters and spaces.");
            return;
        }

        setWarning('')

        try {
            const response = await fetch('http://localhost:5000/api/coaches', {     //Sends request to back end to add a new coach
                method: 'POST',     //You want to send data to the server
                headers: {      
                    'Content-Type': 'application/json',     //Data being sent is in JSON format
                },
                    body: JSON.stringify({ firstName, lastName, city, experience }),      //Converts variables into JSON string format
                });
    
            if (response.ok) {
                const data = await response.json(); 
                console.log('Coach added:', data);
    
                // Set success message
                setSuccessMessage(`Coach ${data.first_name} ${data.last_name} ${data.city} ${data.experience} added successfully!`);
    
                // Retrieve existing coaches from local storage
                const existingCoaches = JSON.parse(localStorage.getItem('coaches')) || [];      //Get existing list of coaches from local storage, if no coaches, create empty array
                existingCoaches.push({ 
                    id: existingCoaches.length + 1,
                    firstName: data.first_name, 
                    lastName: data.last_name, 
                    city: data.city, 
                    experience: data.experience}); 
    
                // Store the updated list in local storage
                localStorage.setItem('coaches', JSON.stringify(existingCoaches));
    
                // Optionally reset the form
                setFirstName('');
                setLastName('');
                setCityName('');
                setExperience('')
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
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCityName(e.target.value)}
                            className="input-field"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className="input-field"
                            required
                        />
                        {warning && <p style = {{color: 'red'}}>{warning} </p>}
                        <button type="submit" className="submit-button">Submit</button>
                    </div>
                </form>
                {successMessage && <p>{successMessage}</p>}
            </div>
        </div>
    );
}