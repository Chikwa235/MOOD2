import React from "react";

function ThemeToggle() {
  const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
  };

  return (
    <div className="toggle-btns">
      <button onClick={toggleTheme}>🌓 Toggle Mode</button>
    </div>
  );
}

export default ThemeToggle;

