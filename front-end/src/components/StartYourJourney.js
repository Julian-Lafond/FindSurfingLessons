import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const StartYourJourney = () => {
  const [coaches, setCoaches] = useState([]);
  const [findCity, setFindCity] = useState("");
  const [findState, setFindState] = useState("");
  const [filteredCoaches, setFilteredCoaches] = useState([]);
  const [profilePage, setProfilePage] = useState("");

  useEffect(() => {
    // Runs when the component is first rendered
    const storedCoaches = JSON.parse(localStorage.getItem("coaches")) || []; // Gets list of coaches from local storage
    console.log("Stored coaches:", storedCoaches); // Log the stored coaches
    setCoaches(storedCoaches);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const filtered = coaches.filter(
      (coach) =>
        coach.city &&
        coach.state &&
        coach.city.toLowerCase().includes(findCity.toLowerCase()) &&
        coach.state.toLowerCase().includes(findState.toLowerCase())
    );
    setFilteredCoaches(filtered);
  };
  return (
    <div className="start-your-journey">
      <h1>Surfing Coaches Near You</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City"
          value={findCity}
          onChange={(e) => setFindCity(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="State"
          value={findState}
          onChange={(e) => setFindState(e.target.value)}
          required
        />
        <button type="submit">Find</button>
      </form>
      <div className="start-your-journey-container">
        {filteredCoaches.length > 0 ? (
          filteredCoaches.map((coach, index) => (
            <div className="coach-card" key={coach.id}>
              {coach.profile_picture && (
                <img
                  src={`http://localhost:5000${coach.profile_picture}`}
                  alt={`${coach.firstName} ${coach.lastName} profile picture image`}
                  className="profile-picture"
                />
              )}
              <div className="coach-card-text">
                <h2>
                  Coach {coach.firstName} {coach.lastName}
                </h2>
                <h3>{coach.experience} years of experience</h3>
                <h4>
                  {coach.city}, {coach.state}
                </h4>
                <p>Private Lesson Rate: ${coach.privateLessonRate}/hr</p>
                <p>Group Lesson Rate: ${coach.groupLessonRate}/hr</p>
              </div>
              <Link to = {`/profile/${coach.id}`}>
                <button className = "profile-button">View Profile Page</button>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-coaches-message">
            <p>No Coaches in this Area</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartYourJourney;
