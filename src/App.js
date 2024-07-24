import React from "react"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import StartYourJourney from "./components/StartYourJourney"
import ApplyToCoach from "./components/ApplyToCoach"
import About from "./components/About"
import Contact from "./components/Contact"
import Header from "./components/Header"
import HomePage from "./components/HomePage"


function App() {
  return (
    <Router>
      <div className = "modules">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path = "/start-your-journey" element = {<StartYourJourney />} />
          <Route path = "/apply-to-coach" element = {<ApplyToCoach />} />
          <Route path = "/about" element = {<About /> } />
          <Route path = "/contact" element = {<Contact /> } />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
