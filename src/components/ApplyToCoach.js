import React, {useState} from 'react';

export default function(){
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("First Name", firstName);
        console.log("Last Name", lastName);
    }
    
    return(
        <div className = "apply-to-coach-container"> 
            <div className = "apply-to-coach">
                <h1>Apply To Become A Surf Coach</h1>
                <h3>Post Your Own Free Coach Page</h3>
                <h3>Find New Surfing Students</h3>
                <h3>Teach Them at Your Own Convenience</h3>
                <h3>Get Paid Directly From Students</h3>
                <h3>Earn 100% of Lessons</h3>
            </div>
            <div className="form-box"> {/* Added a wrapper for the form */}
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
            </div>
        </div>
    )
}