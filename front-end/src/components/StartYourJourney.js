import React, { useEffect, useState } from 'react';

const StartYourJourney = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        // Retrieve names from local storage
        const storedFirstName = localStorage.getItem('firstName');
        const storedLastName = localStorage.getItem('lastName');

        if (storedFirstName) setFirstName(storedFirstName);
        if (storedLastName) setLastName(storedLastName);
    }, []);

    return (
        <div>
            <p>Find Your Coach Page</p>
            {firstName && lastName && (
                <p>Coach {firstName} {lastName}</p>
            )}
        </div>
    );
};

export default StartYourJourney;
