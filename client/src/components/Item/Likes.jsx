import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { likeItem, unlikeItem } from "../../utils/api";
import { useState } from "react";

function Likes({ likes: initialLikes, id }) {
  const userId = useSelector((state) => state.user.userId);
  const token = useSelector((state) => state.user.token);

  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    try {
      await likeItem(id, token);
      setLikes([...likes, { userId }]); // Update likes locally
    } catch (error) {
      console.error("Failed to like the item", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await unlikeItem(id, token);
      setLikes(likes.filter((like) => like.userId !== userId)); // Update likes locally
    } catch (error) {
      console.error("Failed to unlike the item", error);
    }
  };

  const isLiked = likes.some((like) => like.userId === userId);

  return (
    <div className="mt-4 p-2 md:p-6">
      <div className="flex items-center gap-2 mt-4">
        {isLiked ? (
          <div
            className="w-8 h-8 bg-red-300 rounded-full flex items-center justify-center"
            onClick={handleUnlike}
          >
            <FaHeart className="text-red-700 cursor-pointer" />
          </div>
        ) : (
          <div
            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
            onClick={handleLike}
          >
            <FaHeart className=" cursor-pointer" />
          </div>
        )}

        <span>{likes.length} Likes</span>
      </div>
    </div>
  );
}

export default Likes;
