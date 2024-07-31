import React, { useEffect, useState } from 'react';

const StartYourJourney = () => {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {       //Runs when the component is first rendered
        const storedCoaches = JSON.parse(localStorage.getItem('coaches')) || [];        //Gets list of coaches from local storage
        setCoaches(storedCoaches);      
    }, []);

    return (
        <div>
            <h1>Find Your Coach Page</h1>
            {coaches.length > 0 ? (
                coaches.map((coach, index) => (
                    <div key = {coach.id}>
                        <h2>Coach {coach.firstName} {coach.lastName}</h2>
                        <h3>{coach.experience} years of experience</h3>
                        <h4>City: {coach.city}</h4>
                        <p>Private Lesson Rate: ${coach.privateLessonRate}/hr</p>
                    </div>
                ))
            ) : (
                <p>No coaches found.</p>
            )}
        </div>
    );
};


export default StartYourJourney;