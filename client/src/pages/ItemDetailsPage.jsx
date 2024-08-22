import { useLoaderData } from "react-router-dom";
import CommentsSection from "../components/Item/CommentsSection";
import ItemHeader from "../components/Item/ItemHeader";
import Likes from "../components/Item/Likes";
import Tags from "../components/Item/Tags";
function ItemDetailsPage() {
  const data = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-6  min-h-dvh">
      <ItemHeader item={data} />
      <Tags tags={data.tags} />
      <Likes likes={data.likes} id={data.id} />
      <CommentsSection comments={data.comments} id={data.id} />
    </div>
  );
}

export default ItemDetailsPage;
