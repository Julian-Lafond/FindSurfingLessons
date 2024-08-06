import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    const storedCoaches = JSON.parse(localStorage.getItem("coaches")) || [];
    const foundCoach = storedCoaches.find((coach) => coach.id == parseInt(id));
    setCoach(foundCoach);
  }, [id]);

  if (!coach) return <div>Loading...</div>;

  console.log("Coach page", coach);

  return (
    <div className="profile">
      <div className="profile-coach-card">
        <h1>
          Profile of Coach {coach.firstName} {coach.lastName}
        </h1>
        <img
          src={`http://localhost:5000${coach.profile_picture}`}
          alt={`${coach.firstName} ${coach.lastName}`}
          className="profile-picture"
        />
        <div className="profile-coach-card-text">
          <h3>Exprience: {coach.experience} years</h3>
          <h4>
            Location: {coach.city}, {coach.state}{" "}
          </h4>
          <p>Private Lesson Rate: ${coach.privateLessonRate}</p>
          <p>Group Lesson Rate: ${coach.groupLessonRate}</p>
        </div>
        <button className = "contact-me">Contact Me!</button>
      </div>
      <div className = "profile-experience">
        <p>
            About me:
            {coach.profileAbout}</p>
      </div>
      
    </div>
  );
};
export default Profile;
