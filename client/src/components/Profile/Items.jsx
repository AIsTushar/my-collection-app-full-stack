import { useEffect, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import ProfileButton from "./ProfileButton";
import SwitchButton from "./SwitchButton";
import ProfileSearch from "./ProfileSearch";

import Card from "../Card";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMyItems } from "../../utils/api";

function Items() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const data = await getMyItems(token);
          setCurrentItems(data);
        }
      } catch (error) {}
    };

    fetchData();
  }, [token]);

  return (
    <div className="px-8 py-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-xl font-medium">My Items</h1>
        <ProfileButton onClick={() => navigate("/profile/createItem")}>
          create <IoCreateOutline />
        </ProfileButton>
      </div>
      <div className="flex gap-8">
        <SwitchButton />
        <ProfileSearch />
      </div>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[60vh]">
        {currentItems?.map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Items;
