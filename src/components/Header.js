import React from 'react';
import { Link } from 'react-router-dom';


export default function(){
    return(
        <div className = "header">
            <Link to = "/">
                <h1>Find Surfing Lessons</h1>
            </Link>
            <div className = "header-tags">
                <Link to = "/start-your-journey">
                    <h3>Start Your Journey</h3>
                </Link>
                <Link to ="/apply-to-coach">
                    <h3>Apply To Coach</h3>
                </Link>
                <Link to = "/about">
                    <h3>About</h3>
                </Link>
                <Link to = "/contact">
                    <h3>Contact</h3>
                </Link>
            </div>
        </div>
        
    )
}