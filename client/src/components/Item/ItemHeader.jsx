import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { deleteItem } from "../../utils/api";

function ItemHeader({ item }) {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();

  const {
    name,
    customString1,
    customString2,
    customString3,
    customText1,
    customText2,
    customText3,
    customInt1,
    customInt2,
    customInt3,
    customBool1,
    customBool2,
    customBool3,
    customDate1,
    customDate2,
    customDate3,
    collection,
  } = item;

  const fieldMapping = {
    customString1,
    customString2,
    customString3,
    customText1,
    customText2,
    customText3,
    customInt1,
    customInt2,
    customInt3,
    customBool1,
    customBool2,
    customBool3,
    customDate1,
    customDate2,
    customDate3,
  };

  const renderField = (
    fieldState,
    fieldName,
    fieldValue,
    isDate = false,
    isBool = false
  ) => {
    if (fieldState && fieldValue !== undefined) {
      return (
        <p>
          <strong>{fieldName}:</strong>{" "}
          {isDate
            ? new Date(fieldValue).toDateString()
            : isBool
            ? fieldValue
              ? "Yes"
              : "No"
            : fieldValue}
        </p>
      );
    }
    return null;
  };

  const handleDelete = async () => {
    try {
      await deleteItem(item.id, token);
      navigate(`/`);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className=" bg-white border rounded-md p-2 md:p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">{name}</h1>

        {userId === item.collection.userId && (
          <div className="flex gap-2">
            <Button
              design="edit"
              onClick={() => navigate(`/items/${item.id}/edit`)}
            >
              Edit
            </Button>
            <Button design="delete" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>

      {renderField(
        collection.customString1State,
        collection.customString1Name,
        fieldMapping.customString1
      )}
      {renderField(
        collection.customString2State,
        collection.customString2Name,
        fieldMapping.customString2
      )}
      {renderField(
        collection.customString3State,
        collection.customString3Name,
        fieldMapping.customString3
      )}

      {renderField(
        collection.customText1State,
        collection.customText1Name,
        fieldMapping.customText1
      )}
      {renderField(
        collection.customText2State,
        collection.customText2Name,
        fieldMapping.customText2
      )}
      {renderField(
        collection.customText3State,
        collection.customText3Name,
        fieldMapping.customText3
      )}

      {renderField(
        collection.customInt1State,
        collection.customInt1Name,
        fieldMapping.customInt1
      )}
      {renderField(
        collection.customInt2State,
        collection.customInt2Name,
        fieldMapping.customInt2
      )}
      {renderField(
        collection.customInt3State,
        collection.customInt3Name,
        fieldMapping.customInt3
      )}

      {renderField(
        collection.customBool1State,
        collection.customBool1Name,
        fieldMapping.customBool1,
        false,
        true
      )}
      {renderField(
        collection.customBool2State,
        collection.customBool2Name,
        fieldMapping.customBool2,
        false,
        true
      )}
      {renderField(
        collection.customBool3State,
        collection.customBool3Name,
        fieldMapping.customBool3,
        false,
        true
      )}

      {renderField(
        collection.customDate1State,
        collection.customDate1Name,
        fieldMapping.customDate1,
        true
      )}
      {renderField(
        collection.customDate2State,
        collection.customDate2Name,
        fieldMapping.customDate2,
        true
      )}
      {renderField(
        collection.customDate3State,
        collection.customDate3Name,
        fieldMapping.customDate3,
        true
      )}
    </div>
  );
}

export default ItemHeader;
