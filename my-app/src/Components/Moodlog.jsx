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

    const totalPages = Math.ceil(logs.length / logsPerPage);
  const start = (currentPage - 1) * logsPerPage;
  const paginated = logs.slice(start, start + logsPerPage);

  // Adjust current page if out of bounds (e.g. after delete)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [logs, currentPage, totalPages]);

        return (
    <div className="section">
      <h2>📊 Your Mood Log</h2>
      {logs.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <>
          {paginated.map((log) => (
            <div className="log-entry" key={log.id} style={{ borderBottom: "1px solid #eee", marginBottom: 12, paddingBottom: 8 }}>
              <strong>Mood:</strong> {log.mood}
              <span style={{ float: "right", fontSize: "0.8rem" }}>{log.time}</span>
              <div className="log-details">

                      <span role="img" aria-label="note">📝</span> {log.text}
                <div style={{ marginTop: 8 }}>
                  <button className="icon-btn" onClick={() => deleteLog(log.id)} title="Delete">🗑️ Delete</button>
                  <button className="icon-btn" onClick={() => editLog(log.id)} title="Edit">✏️ Edit</button>
                </div>
              </div>
            </div>
          ))}

           <div id="pagination" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
               id="prevPage"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span id="pageInfo" style={{ margin: "0 1rem" }}>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              id="nextPage"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MoodLog;

