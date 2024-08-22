import { useEffect, useState } from "react";
import { createItem, getMyCollections } from "../utils/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateItem() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [itemName, setItemName] = useState("");
  const [tags, setTags] = useState("");
  const [customFields, setCustomFields] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const data = await getMyCollections(token);
          setCollections(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value);
    setCustomFields({});
  };

  const handleCustomFieldChange = (fieldType, fieldIndex, value) => {
    let formattedValue = value;
    if (fieldType === "customInt") {
      formattedValue = parseInt(value, 10);
    } else if (fieldType === "customDate") {
      formattedValue = `${value}T00:00:00.000Z`;
    }

    setCustomFields((prevFields) => ({
      ...prevFields,
      [`${fieldType}${fieldIndex + 1}`]: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemData = {
      name: itemName,
      collectionId: parseInt(selectedCollection),
      tags: tags.split(",").map((tag) => tag.trim()),
      ...customFields,
    };

    try {
      await createItem(itemData, token);
      navigate(`/profile/items`);
    } catch (error) {
      console.error(error);
    }
  };

  const renderCustomFields = (collection, fieldType, label) => {
    const fields = [];
    for (let i = 0; i < 3; i++) {
      if (collection[`${fieldType}${i + 1}State`]) {
        fields.push(
          <div className="mb-4" key={`${fieldType}${i + 1}`}>
            <label
              htmlFor={`${fieldType}${i + 1}`}
              className="block font-medium mb-2"
            >
              {collection[`${fieldType}${i + 1}Name`]}
            </label>
            {fieldType === "customBool" ? (
              <input
                type="checkbox"
                id={`${fieldType}${i + 1}`}
                className="w-4 h-4"
                checked={customFields[`${fieldType}${i + 1}`] || false}
                onChange={(e) =>
                  handleCustomFieldChange(fieldType, i, e.target.checked)
                }
              />
            ) : fieldType === "customText" ? (
              <textarea
                id={`${fieldType}${i + 1}`}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={customFields[`${fieldType}${i + 1}`] || ""}
                onChange={(e) =>
                  handleCustomFieldChange(fieldType, i, e.target.value)
                }
              ></textarea>
            ) : (
              <input
                type={fieldType === "customDate" ? "date" : "text"}
                id={`${fieldType}${i + 1}`}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={customFields[`${fieldType}${i + 1}`] || ""}
                onChange={(e) =>
                  handleCustomFieldChange(fieldType, i, e.target.value)
                }
              />
            )}
          </div>
        );
      }
    }
    return fields;
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="collection" className="block font-medium mb-2">
            Collection
          </label>
          <select
            id="collection"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={selectedCollection}
            onChange={handleCollectionChange}
            required
          >
            <option value="">Select a collection</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block font-medium mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {selectedCollection && (
          <>
            <h3 className="text-xl font-bold mb-4">Custom Fields</h3>

            {renderCustomFields(
              collections.find((c) => c.id === parseInt(selectedCollection)),
              "customString",
              "Custom String"
            )}

            {renderCustomFields(
              collections.find((c) => c.id === parseInt(selectedCollection)),
              "customText",
              "Custom Text"
            )}

            {renderCustomFields(
              collections.find((c) => c.id === parseInt(selectedCollection)),
              "customInt",
              "Custom Number"
            )}

            {renderCustomFields(
              collections.find((c) => c.id === parseInt(selectedCollection)),
              "customBool",
              "Custom Boolean"
            )}

            {renderCustomFields(
              collections.find((c) => c.id === parseInt(selectedCollection)),
              "customDate",
              "Custom Date"
            )}
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Create Item
        </button>
      </form>
    </div>
  );
}

export default CreateItem;
