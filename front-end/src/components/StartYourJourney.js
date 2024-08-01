import React, { useEffect, useState } from "react";

const StartYourJourney = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    //Runs when the component is first rendered
    const storedCoaches = JSON.parse(localStorage.getItem("coaches")) || []; //Gets list of coaches from local storage
    setCoaches(storedCoaches);
  }, []);

  return (
    <div className="start-your-journey">
      <h1>Surfing Coaches Near Your</h1>
      <div className="start-your-journey-container">
        {coaches.length > 0 ? (
          coaches.map((coach, index) => (
            <div className="coach-card" key={coach.id}>
              <h2>
                Coach {coach.firstName} {coach.lastName}
              </h2>
              <h3>{coach.experience} years of experience</h3>
              <h4>City: {coach.city}</h4>
              <p>Private Lesson Rate: ${coach.privateLessonRate}/hr</p>
              <p>Group Lesson Rate: ${coach.groupLessonRate}/hr</p>
            </div>
          ))
        ) : (
          <p>No coaches found.</p>
        )}
      </div>
    </div>
  );
};

export default StartYourJourney;
