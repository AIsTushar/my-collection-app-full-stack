function Button({ children, design, onClick }) {
  const base =
    "focus:ring text-sm inline-block h-8 border rounded-full px-3 py-1 uppercase tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-1  focus:ring-offset-2";
  const style = {
    primary:
      " bg-black text-white text-md font-bold py-2 px-6 rounded-full uppercase transition duration-300 hover:bg-gray-800 hover:translate-y-[-2px] hover:shadow-lg",
    delete:
      base +
      " text-red-500 border-red-500 hover:text-red-300 hover:border-red-300 focus:ring-red-500",
    edit:
      base +
      " text-gray-500 border-gray-500 hover:text-gray-400 hover:border-gray-400 focus:ring-gray-500",
    back: "focus:ring text-sm inline-block rounded-full border-2 px-4 py-2.5 md:px-6 md:py-3.5 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:text-stone-800 focus:ring-offset-2 disabled:cursor-not-allowed",
    tag: base + " border-gray-400 text-gray-400",
    add:
      base +
      " border-gray-500 w-fit focus:ring-gray-500 hover:border-gray-400 hover:text-gray-400",
    login:
      "bg-black text-white text-sm font-bold py-1 px-3 rounded-full uppercase",
    logout:
      "bg-white text-black border border-black text-sm font-bold py-1 px-3 rounded-full uppercase",
  };

  return (
    <button className={style[design]} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
