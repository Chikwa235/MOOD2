import React, { useState, useEffect } from "react";

function MoodLog() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  // Fetch logs from localStorage and update state
  const fetchLogs = () => {
    const storedLogs = JSON.parse(localStorage.getItem("moodLogs") || "[]");
    setLogs(storedLogs.reverse());
  };

    useEffect(() => {
    fetchLogs();

    const handleStorageChange = () => {
      fetchLogs();
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(fetchLogs, 500); // backup polling

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

    const deleteLog = (id) => {
    const updated = logs.filter(log => log.id !== id);
    setLogs(updated);
    localStorage.setItem("moodLogs", JSON.stringify(updated.reverse()));
  };

    const editLog = (id) => {
    const entry = logs.find(log => log.id === id);
    if (!entry) return;
    localStorage.setItem("editLog", JSON.stringify(entry));
    deleteLog(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
