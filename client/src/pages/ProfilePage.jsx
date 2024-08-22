import { Outlet } from "react-router-dom";
import SideNav from "../components/Profile/SideNav";

function ProfilePage() {
  const handleOneCHange = () => {};
  return (
    <div className="w-full min-h-screen flex bg-gray-200 lg:px-16 lg:py-8">
      <div className="w-full flex flex-col bg-white rounded-lg overflow-hidden lg:flex-row">
        {/* Sidebar */}
        <SideNav handleOneCHange={handleOneCHange} />

        {/* Right-side content */}
        <div className="flex-1 overflow-y-auto p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
