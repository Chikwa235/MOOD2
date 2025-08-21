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
