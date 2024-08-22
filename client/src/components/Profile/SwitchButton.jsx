import { useState } from "react";

const SwitchButton = () => {
  const [selected, setSelected] = useState("Recent");

  const options = ["Recent", "Popular"];

  return (
    <div className="inline-flex items-center bg-gray-100 p-1 rounded-lg">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`px-4 py-2 text-sm rounded-lg border ${
            selected === option
              ? "border-gray-700 text-black"
              : "border-transparent text-gray-600"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default SwitchButton;
