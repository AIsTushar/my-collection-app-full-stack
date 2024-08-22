// import collectionItem from "../../../data/collection.json";
import CollectionCard from "./CollectionCard";

function TopCollections({ topCollections }) {
  return (
    <section className="px-6 py-4 mt-12">
      <h1 className="text-3xl text-black font-medium mb-10">
        Most Popular Collections
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {topCollections.map((item, index) => {
          return <CollectionCard key={index} item={item} />;
        })}
      </div>
    </section>
  );
}

export default TopCollections;
