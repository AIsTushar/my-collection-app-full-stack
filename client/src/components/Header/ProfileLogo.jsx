import { Link } from "react-router-dom";

function ProfileLogo({ picture }) {
  return (
    <Link
      to="/profile"
      className="w-10 h-10 rounded-full overflow-hidden clickable"
    >
      <img className="w-full object-cover" src={picture} alt="Profile" />
    </Link>
  );
}

export default ProfileLogo;
