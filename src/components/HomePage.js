import React from 'react';
import {Link} from 'react-router-dom';

export default function(){
    return(
        <div className="home-page">
            <div className="home-page-container">
                <div className="surf-lesson-image">
                    <img src="images/surf-lesson.jpeg" alt="Surfing Lesson"/>
                </div>
                <div className="home-page-text">
                    <h1>Find A Surfing Coach Near You!</h1>
                    <Link to = "/start-your-journey">
                        <button>Find Your Surfing Coach</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
