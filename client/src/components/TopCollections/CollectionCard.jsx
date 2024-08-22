import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../../utils/helper";

function CollectionCard({ item }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg transition-all duration-300 hover:scale-[1.025] hover:cursor-pointer"
      onClick={() => navigate(`/collections/${item.id}`)}
    >
      <div className="relative h-48 w-full mb-4 p-2">
        <img
          src={item.imageUrl}
          alt="Item 1"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl z-50 border-2 transform  border-gray-200"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
      <div className="flex gap-3">
        <p className="text-gray-500 mb-2 text-xs">{item._count.items} Items</p>
        <p className="text-gray-500 text-xs">{formatTimeAgo(item.createdAt)}</p>
      </div>
    </div>
  );
}

export default CollectionCard;
