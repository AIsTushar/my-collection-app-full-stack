import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Card({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex p-4 gap-3 flex-col rounded-lg max-w-max transition-all duration-300 hover:scale-[1.025] hover:cursor-pointer  hover:shadow-md"
      onClick={() => navigate(`/items/${item.id}`)}
    >
      <div className="w-full h-40 overflow-hidden rounded-lg">
        <img
          className="w-full object-cover"
          src={item.collection?.imageUrl}
          alt={item?.name}
        />
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold">{item.name}</span>
        <span className="text-2xl">{item.collection?.name}</span>
        <span className="text-xs">{item.collection?.user.name}</span>

        <div className="flex items-center gap-2 mt-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <FaHeart />
          </div>
          <span>{item.likes.length} Likes</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
