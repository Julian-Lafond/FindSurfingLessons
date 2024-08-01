import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home">
      <div className="home-header">
        <p>
          <strong>
            <h1>
              Welcome to Find Surfing Lessons - Ride the Waves with Expert
              Guidance!
            </h1>
          </strong>
          At Find Surfing Lessons, we connect aspiring surfers with passionate
          surf coaches ready to help you ride the waves like a pro.
        </p>
      </div>
      <div className="home-content">
        <div className="surf-coach-container">
          <h2>Find A Surfing Coach Near You!</h2>
          <div className="surf-lesson-image">
            <img src="images/surf-lesson.jpeg" alt="Surfing Lesson" />
          </div>
          <Link to="/start-your-journey">
            <button>Find Your Surfing Coach</button>
          </Link>
        </div>
        <div className="why-choose-us-container">
          <strong><h2>Why Choose Us?</h2></strong>
          <ul>
            <li>
              <strong>Connect with Local Coaches:</strong> Find surf coaches in
              your area who understand the best spots and conditions.
            </li>
            <li>
              <strong>Flexible Scheduling:</strong> Choose lesson times that
              work for you, whether it’s a weekend morning or a weekday
              afternoon.
            </li>
            <li>
              <strong>Diverse Learning Styles:</strong> Each coach has a unique
              teaching style; discover what resonates with you!
            </li>
          </ul>
          Dive into the world of surfing with Find Surfing Lessons. Sign up
          today, and let’s make your surfing dreams a reality!
          <br />
          <br />
    
        </div>
      </div>
      <div className="home-bottom">
        <div className="for-surf-coaches">
          <strong><h3>For Surf Coaches</h3></strong> Join our community of expert
          coaches and share your love for surfing! Create a free profile, and reach out to students eager to learn. Whether you’re
          a seasoned pro or just love sharing the thrill of the ocean, you’ll
          find your perfect match here.
        </div>
        <div className="for-aspiring-surfers">
          <strong><h3>For Aspiring Surfers</h3></strong> Looking for personalized surf
          lessons tailored to your needs? Explore our diverse roster of
          qualified surf coaches who are ready to guide you, regardless of your
          skill level. From beginners to advanced surfers, our coaches offer
          tailored lessons to help you achieve your surfing goals.
        </div>
      </div>
    </div>
  );
}
