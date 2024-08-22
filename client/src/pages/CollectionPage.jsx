// import Button from "../components/Button/Button";
import Card from "../components/Card";
import { Link, useLoaderData } from "react-router-dom";

function CollectionPage() {
  const data = useLoaderData();
  const tags = data.items.flatMap((item) => item.tags.map((tag) => tag.name));
  const items = data.items;
  const relatedCollections = data.category.collections.filter(
    (collection) => collection.id !== data.id
  );

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <div className="flex flex-col items-center justify-center h-56 bg-cover">
        <h1 className="text-3xl mb-2">{data.name}</h1>
        <p className="text-lg text-gray-500">{data.user.name}</p>
        {/* <div className="flex gap-2 mt-6">
          <Button design="edit">Edit</Button>
          <Button design="delete">Delete</Button>
        </div> */}
      </div>
      <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-400" />
      <div className="flex flex-col sm:flex-row min-h-[100vh]">
        {/* left */}
        <div className="border-b border-gray-500 md:border-r md:border-gray-300 md:w-[70%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
            {items.map((item, i) => {
              return <Card key={i} item={item} />;
            })}
          </div>
        </div>

        {/* Right */}
        <div className="py-4 px-3 md:w-[30%]">
          <div className="mb-6 flex flex-col gap-2">
            <img
              src={data.imageUrl}
              alt="collection cover"
              className="w-full md:w-72"
            />
            <p className="text-lg text-gray-700">Description</p>
            <p className="text-gray-500 text-sm">{data.description}</p>
          </div>
          <div className="mb-6">
            <p className="text-lg mb-4 text-gray-700">Related Tags:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-full text-center cursor-pointer hover:bg-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-lg mb-4 text-gray-700">Related Collections</p>
            <div className="flex flex-col">
              {relatedCollections.map((collection, i) => (
                <Link
                  key={i}
                  to={`/collection/${collection.id}`}
                  className="text-sm text-gray-500 hover:text-blue-500"
                >
                  {collection.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionPage;
