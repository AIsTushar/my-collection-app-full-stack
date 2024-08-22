import { useState } from "react";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

function Theme() {
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "light");

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <button className="text-2xl px-4 ml-2" onClick={handleToggle}>
      {theme === "light" ? <CiLight /> : <MdDarkMode />}
    </button>
  );
}

export default Theme;
