import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateItem } from "../utils/api";
import { useSelector } from "react-redux";

function EditItem() {
  const data = useLoaderData();
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const item = data;

  const { collection } = data;

  const [name, setName] = useState(item.name);
  const [customFields, setCustomFields] = useState({
    customString1: item.customString1 || "",
    customString2: item.customString2 || "",
    customString3: item.customString3 || "",
    customText1: item.customText1 || "",
    customText2: item.customText2 || "",
    customText3: item.customText3 || "",
    customInt1: item.customInt1 || null,
    customInt2: item.customInt2 || null,
    customInt3: item.customInt3 || null,
    customBool1: item.customBool1 || false,
    customBool2: item.customBool2 || false,
    customBool3: item.customBool3 || false,
    customDate1: item.customDate1 || null,
    customDate2: item.customDate2 || null,
    customDate3: item.customDate3 || null,
  });

  const handleCustomFieldChange = (field, value) => {
    setCustomFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedItem = {
      name,
      ...customFields,
    };

    try {
      await updateItem(item.id, updatedItem, token);
      navigate(`/items/${item.id}`);
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  };

  const renderCustomFields = (fieldType, label) => {
    const fields = [];
    for (let i = 0; i < 3; i++) {
      if (collection[`${fieldType}${i + 1}State`]) {
        const fieldName = `${fieldType}${i + 1}`;
        fields.push(
          <div className="mb-4" key={fieldName}>
            <label htmlFor={fieldName} className="block font-medium mb-2">
              {collection[`${fieldType}${i + 1}Name`]}
            </label>
            {fieldType === "customBool" ? (
              <input
                type="checkbox"
                id={fieldName}
                className="w-4 h-4"
                checked={customFields[fieldName]}
                onChange={(e) =>
                  handleCustomFieldChange(fieldName, e.target.checked)
                }
              />
            ) : fieldType === "customText" ? (
              <textarea
                id={fieldName}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={customFields[fieldName]}
                onChange={(e) =>
                  handleCustomFieldChange(fieldName, e.target.value)
                }
              ></textarea>
            ) : (
              <input
                type={fieldType === "customDate" ? "date" : "text"}
                id={fieldName}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                value={
                  fieldType === "customDate"
                    ? customFields[fieldName]?.slice(0, 10)
                    : customFields[fieldName]
                }
                onChange={(e) =>
                  handleCustomFieldChange(fieldName, e.target.value)
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
    <div className="max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <h3 className="text-xl font-bold mb-4">Custom Fields</h3>

        {renderCustomFields("customString", "Custom String")}
        {renderCustomFields("customText", "Custom Text")}
        {renderCustomFields("customInt", "Custom Number")}
        {renderCustomFields("customBool", "Custom Boolean")}
        {renderCustomFields("customDate", "Custom Date")}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Update Item
        </button>
      </form>
    </div>
  );
}

export default EditItem;
