import React from "react";
import MoodSection from "./Components/Moodsection";
import MoodLog from "./Components/Moodlog";
import BreathingExercise from "./components/BreathingExercise";
import ThemeToggle from "./components/ThemeToggle";
import Logo from "./components/Logo";
import "./App.css";
import { useEffect, useContext } from "react";
import StyleContext from "./contexts/StyleContext";

function App() {
  const { isDark } = useContext(StyleContext);

  // Ensure body gets the dark-mode class so global CSS can react
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    // cleanup not strictly needed but safe
    return () => document.body.classList.remove("dark-mode");
  }, [isDark]);

  return (
    <div className="App">
      <Logo />
      <h1>🧠 Daily Mental Health Check-In</h1>
      <ThemeToggle />
      <MoodSection />
      <MoodLog />
      <BreathingExercise />
      <footer id="app-footer">
  &copy; 2025 Mood App | Built with 💡 by Chisapa
</footer>

    </div>
  );
}

export default App;
