import { useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { createCollection } from "../utils/api";
import axios from "axios";

function CreateCollection() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const categories = useLoaderData();
  const [collectionName, setCollectionName] = useState("");
  const [collectionDescription, setCollectionDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customFields, setCustomFields] = useState({
    string: [{ name: "" }],
    int: [{ name: "" }],
    text: [{ name: "" }],
    bool: [{ name: "" }],
    date: [{ name: "" }],
  });

  const handleCustomFieldChange = (type, index, value) => {
    setCustomFields((prevFields) => {
      const updatedFields = { ...prevFields };
      updatedFields[type][index].name = value;
      return updatedFields;
    });
  };

  const handleAddCustomField = (type) => {
    setCustomFields((prevFields) => {
      const updatedFields = { ...prevFields };
      if (updatedFields[type].length < 3) {
        updatedFields[type].push({ name: "" });
      }
      return updatedFields;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collectionData = {
      name: collectionName,
      description: collectionDescription,
      categoryId: parseInt(selectedCategory),
      imageUrl: imageUrl,
      customString1State: customFields.string.length > 0,
      customString1Name: customFields.string[0]?.name,
      customString2State: customFields.string.length > 1,
      customString2Name: customFields.string[1]?.name,
      customString3State: customFields.string.length > 2,
      customString3Name: customFields.string[2]?.name,

      customInt1State: customFields.int.length > 0,
      customInt1Name: customFields.int[0]?.name,
      customInt2State: customFields.int.length > 1,
      customInt2Name: customFields.int[1]?.name,
      customInt3State: customFields.int.length > 2,
      customInt3Name: customFields.int[2]?.name,

      customText1State: customFields.text.length > 0,
      customText1Name: customFields.text[0]?.name,
      customText2State: customFields.text.length > 1,
      customText2Name: customFields.text[1]?.name,
      customText3State: customFields.text.length > 2,
      customText3Name: customFields.text[2]?.name,

      customBool1State: customFields.bool.length > 0,
      customBool1Name: customFields.bool[0]?.name,
      customBool2State: customFields.bool.length > 1,
      customBool2Name: customFields.bool[1]?.name,
      customBool3State: customFields.bool.length > 2,
      customBool3Name: customFields.bool[2]?.name,

      customDate1State: customFields.date.length > 0,
      customDate1Name: customFields.date[0]?.name,
      customDate2State: customFields.date.length > 1,
      customDate2Name: customFields.date[1]?.name,
      customDate3State: customFields.date.length > 2,
      customDate3Name: customFields.date[2]?.name,
    };

    try {
      await createCollection(collectionData, token);
      navigate("/profile/collections");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "my_app"); // Replace with your upload preset
    formData.append("cloud_name", "dvaxcvjus"); // Replace with your cloud name
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvaxcvjus/image/upload`,
        formData
      );
      setImageUrl(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading the image", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create Collection</h2>
      <form onSubmit={handleSubmit}>
        {/* Collection Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            required
          />
        </div>
        {/* Collection Image */}
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="image_input" className="block font-medium mb-2">
            Image
          </label>
          <img className="w-32 h-32 " src={imageUrl} alt="Upload" />
          <input type="file" id="image_input" onChange={uploadImage} />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block font-medium mb-2">
            Or Url
          </label>
          <input
            type="text"
            id="image"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        {/* Collection Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={collectionDescription}
            onChange={(e) => setCollectionDescription(e.target.value)}
            required
          />
        </div>
        {/* Collection Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium mb-2">
            Category
          </label>
          <select
            id="category"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <h3 className="text-xl font-bold mb-4">Custom Fields</h3>

        {["string", "int", "text", "bool", "date"].map((type) => (
          <div key={type} className="mb-4">
            <label
              htmlFor={`custom-${type}-fields`}
              className="block font-medium mb-2 capitalize"
            >
              {`${type.charAt(0).toUpperCase() + type.slice(1)} Fields`}
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id={`custom-${type}-fields`}
                className="w-20 border border-gray-300 rounded-md px-4 py-2 mr-4"
                min="0"
                max="3"
                value={customFields[type].length}
                onChange={(e) =>
                  setCustomFields((prevFields) => ({
                    ...prevFields,
                    [type]: Array.from(
                      { length: parseInt(e.target.value) },
                      () => ({ name: "" })
                    ),
                  }))
                }
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                onClick={() => handleAddCustomField(type)}
              >
                Add
              </button>
            </div>
            {customFields[type].map((field, index) => (
              <div key={index} className="mt-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                  placeholder={`${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Field ${index + 1}`}
                  value={field.name}
                  onChange={(e) =>
                    handleCustomFieldChange(type, index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Create Collection
        </button>
      </form>
    </div>
  );
}

export default CreateCollection;
