import { NavLink } from "react-router-dom";

function SideNav({ handleOneCHange }) {
  return (
    <div className="w-full px-6 py-4 flex justify-around gap-4 border-b border-stone-300 lg:flex-col lg:justify-normal lg:w-36 lg:border-r">
      <NavLink
        to="/profile"
        end
        className={({ isActive }) =>
          isActive
            ? "text-sm w-fit text-blue-500 font-medium rounded-full bg-blue-200 px-3 py-1"
            : "text-sm text-gray-500 font-medium"
        }
      >
        Profile
      </NavLink>
      <NavLink
        to="/profile/collections"
        className={({ isActive }) =>
          isActive
            ? "text-sm w-fit text-blue-500 font-medium rounded-full bg-blue-200 px-3 py-1"
            : "text-sm text-gray-500 font-medium"
        }
      >
        Collections
      </NavLink>
      <NavLink
        to="/profile/items"
        className={({ isActive }) =>
          isActive
            ? "text-sm w-fit text-blue-500 font-medium rounded-full bg-blue-200 px-3 py-1"
            : "text-sm text-gray-500 font-medium"
        }
      >
        Items
      </NavLink>
    </div>
  );
}

export default SideNav;
