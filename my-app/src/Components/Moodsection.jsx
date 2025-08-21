import React, { useState, useEffect } from "react";
 
const quotes = {
  // eslint-disable-next-line 
  '😊 Happy': ["Keep shining, the world needs your light!"],
  // eslint-disable-next-line 
  '😐 Neutral': ["Even neutral days carry growth."],
  // eslint-disable-next-line
  '😞 Sad': ["It’s okay to not be okay. You’re not alone."],
  // eslint-disable-next-line
  '😠 Angry': ["Breathe. You’re stronger than your anger."],
  // eslint-disable-next-line
  '😰 Anxious': ["Inhale calm, exhale tension. You’ve got this."]
};

const affirmations = [
  "I am resilient and can handle life's challenges.",
  "Every breath I take calms me.",
  "I choose peace over worry.",
  "My emotions are valid, and I respect them.",
  "I grow stronger with every experience."
];

function MoodSection() {
  const [mood, setMood] = useState(null);
  const [entry, setEntry] = useState("");
  const [quote, setQuote] = useState("");
  const [affirmation, setAffirmation] = useState("");
  const [journalPrompt, setJournalPrompt] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Load logs on mount
    const stored = JSON.parse(localStorage.getItem("moodLogs") || "[]");
    setLogs(stored.reverse());
    // Listen for updates
    const updateLogs = () => {
      const updated = JSON.parse(localStorage.getItem("moodLogs") || "[]");
      setLogs(updated.reverse());
    };
    window.addEventListener("storage", updateLogs);
    return () => window.removeEventListener("storage", updateLogs);
  }, []);

  const handleMoodSelect = (emoji) => {
    setMood(emoji);
    setQuote(quotes[emoji][0]);
    setAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    setJournalPrompt(`Why did you feel ${emoji} today?`);
  };

  const saveJournal = () => {
    if (!mood) return alert("Select your mood.");
    if (!entry) return alert("Write something before saving.");

    const logs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
    logs.push({
      id: Date.now(),
      mood,
      text: entry,
      time: new Date().toLocaleString(),
    });

    localStorage.setItem("moodLogs", JSON.stringify(logs));
    window.dispatchEvent(new Event("storage"));

    // Reset
    setMood(null);
    setEntry("");
    setQuote("");
    setAffirmation("");
    setJournalPrompt("");
    alert("Journal saved!");
  };