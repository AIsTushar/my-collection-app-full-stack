function ProfileButton({ children, onClick, type }) {
  return (
    <button
      className="flex items-center gap-1 px-4 py-1 border text-sm uppercase text-blue-700 bg-blue-300 border-stone-300 rounded-full"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default ProfileButton;
