function Tags({ tags }) {
  return (
    <div className="mt-4 p-2 md:p-6">
      <h3 className="font-semibold mb-3">Tags:</h3>
      <div className="flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="mr-2 mb-2 px-3 py-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Tags;
