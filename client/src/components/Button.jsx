function Button({ children, type, onClick }) {
  if (type === "primary") {
    return (
      <button
        className="bg-black text-white text-sm font-bold py-2 px-4 rounded-full uppercase"
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className="bg-white text-black border border-black text-sm font-bold py-2 px-4 rounded-full uppercase"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
