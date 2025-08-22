import React from "react";
import MoodSection from "./Components/Moodsection";
import MoodLog from "./Components/Moodlog";
import BreathingExercise from "./components/BreathingExercise";
import ThemeToggle from "./components/ThemeToggle";
import Logo from "./components/Logo";
import "./App.css";


function App() {
  return (
    <div className="App">
      <Logo />
      <h1>🧠 Daily Mental Health Check-In</h1>
      <ThemeToggle />
      <MoodSection />
      <MoodLog />
      <BreathingExercise />
    </div>
  );
}

export default App;
