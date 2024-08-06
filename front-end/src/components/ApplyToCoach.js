import React, { useState } from "react";

export default function ApplyToCoach() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCityName] = useState("");
  const [experience, setExperience] = useState("");
  const [privateLessonRate, setPrivateLessonRate] = useState("");
  const [groupLessonRate, setGroupLessonRate] = useState("");
  const [state, setStateName] = useState("");
  const [profileAbout, setProfileAbout] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [warning, setWarning] = useState("");

  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const experienceValue = experience.trim();
    if (!/^\d+$/.test(experienceValue)) {
      setWarning("Please enter a number for experience.");
      return;
    } else {
      setWarning("");
    }

    const privateLessonRateValue = privateLessonRate.trim().replace("$", "");
    if (!/^\d+(\.\d{2})?$/.test(privateLessonRateValue)) {
      setWarning("Please enter a valid number for private lesson rate.");
      return;
    }

    const groupLessonRateValue = groupLessonRate.trim().replace("$", "");
    if (!/^\d+(\.\d{2})?$/.test(groupLessonRateValue)) {
      setWarning("Please enter a valid number for group lesson rate.");
      return;
    }

    if (!/^[a-zA-Z]+$/.test(firstName)) {
      setWarning("First name can only contain letters.");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(lastName)) {
      setWarning("Last name can only contain letters.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(city)) {
      setWarning("City can only contain letters and spaces.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(state)) {
      setWarning("State can only contain letters and spaces.");
      return;
    }

    setWarning("");

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("experience", experience);
    formData.append("privateLessonRate", privateLessonRateValue);
    formData.append("groupLessonRate", groupLessonRateValue);
    formData.append("profileAbout", profileAbout);
    formData.append("profilePicture", profilePicture);

    try {
      const response = await fetch("http://localhost:5000/api/coaches", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Coach added:", data);

        setSuccessMessage(
          `Coach ${data.first_name} ${data.last_name} added successfully!`
        );

        const existingCoaches =
          JSON.parse(localStorage.getItem("coaches")) || [];
        existingCoaches.push({
          id: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          city: data.city,
          state: data.state,
          experience: data.experience,
          privateLessonRate: data.private_lesson_rate,
          groupLessonRate: data.group_lesson_rate,
          profileAbout: data.profile_about,
          profile_picture: data.profile_picture,
        });

        localStorage.setItem("coaches", JSON.stringify(existingCoaches));

        setFirstName("");
        setLastName("");
        setCityName("");
        setStateName("");
        setExperience("");
        setPrivateLessonRate("");
        setGroupLessonRate("");
        setProfileAbout("");
        setProfilePicture(null);
      } else {
        console.error("Error adding coach:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="apply-to-coach-container">
      <div className="apply-to-coach-info-container">
        <div className="apply-to-coach">
          <h1>Steps To Become A Surf Coach</h1>
          <h3>1. Post Your Own Free Coach Page</h3>
          <h3>2. Find New Surfing Students</h3>
          <h3>3. Teach Them at Your Own Convenience</h3>
          <h3>4. Get Paid Directly From Students</h3>
          <h3>5. Earn 100% of Lessons</h3>
        </div>
        <div className="apply-to-coach-two">
          <h2>Why Become a Surf Coach?</h2>
          <p>
            <strong>1. Share Your Passion:</strong> As a surf coach, you'll have
            the chance to share your love for the sport with others. Whether
            you're helping a beginner catch their first wave or refining the
            skills of an experienced surfer, your guidance can inspire and
            motivate students to reach new heights.
          </p>
          <p>
            <strong>2. Flexible Schedule:</strong> We understand that
            flexibility is important. You can set your own coaching hours and
            choose the locations where you prefer to teach. This allows you to
            balance your coaching with other personal and professional
            commitments.
          </p>
          <p>
            <strong>3. Competitive Compensation:</strong> We value your
            expertise and time. You will make 100% of every lesson after the
            first lesson.
          </p>
        </div>
      </div>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="apply-to-coach-form">
            <h2>Apply To Coach Form</h2>
            <h4>
              Join our community of expert surf coaches <br></br>
              and share your passion for surfing with others. <br></br>
              Fill out the form below to apply.
            </h4>
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
              placeholder="State"
              value={state}
              onChange={(e) => setStateName(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Years of Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Private Lesson Rate"
              value={privateLessonRate}
              onChange={(e) => setPrivateLessonRate(e.target.value)}
              className="input-field"
              required
            />
            <input
              type="text"
              placeholder="Group Lesson Rate"
              value={groupLessonRate}
              onChange={(e) => setGroupLessonRate(e.target.value)}
              className="input-field"
              required
            />
            <textarea
              placeholder="About Page For Profile"
              value={profileAbout}
              onChange={(e) => setProfileAbout(e.target.value)}
              className="input-field profile-about"
              required
            />
            <label className="file-input-label">
              Upload Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="input-field"
                required
              />
            </label>
            {warning && <p style={{ color: "red" }}>{warning}</p>}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
        {successMessage && <p>{successMessage}</p>}
      </div>
    </div>
  );
}
