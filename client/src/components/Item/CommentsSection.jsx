import Button from "../Button/Button";
import { formatTimeAgo } from "../../utils/helper";
import { useSelector } from "react-redux";
import { useState } from "react";
import { addComment } from "../../utils/api";

function CommentsSection({ comments: initialComments, id }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(initialComments);

  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await addComment(id, commentText, token);
      setComments([
        ...comments,
        {
          ...newComment,
          user: { picture: user.picture },
          content: commentText,
          createdAt: new Date().toISOString(),
        },
      ]);
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };
  return (
    <div className="mt-8 border rounded-md p-2 md:p-6">
      <h3 className="text-lg font-semibold">Comments:</h3>
      <ul>
        {comments.map((comment, i) => (
          <li key={i} className="border-b py-2 border-gray-400">
            <div className="flex gap-6 sm:gap-4">
              <div className="max-w-[5%]">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img src={comment.user.picture} alt="user_photo" />
                </div>
              </div>
              <div className="max-w-[88%]">
                <p>{comment.content}</p>
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(comment.createdAt)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <textarea
            className="rounded-md border border-gray-500 w-[40%] focus:outline-none px-3 py-1 text-sm"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your comment"
          ></textarea>
          <Button type="submit" design="add">
            Add
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CommentsSection;
