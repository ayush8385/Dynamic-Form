import { useContext, useState } from "react";
import "./index.css";
import { FormConfigContext } from "../../../context/FormConfigContext";

const CheckBoxType = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);
  const [optionValue, setOptionValue] = useState("");
  const [editOptionId, setEditOptionId] = useState(null);
  const [editOptionValue, setEditOptionValue] = useState("");

  const updateFieldInFormConfig = (updatedField) => {
    setFormConfig((prev) =>
      prev.map((item) =>
        item.id === field.id ? { ...item, ...updatedField } : item
      )
    );
  };

  const saveOption = () => {
    if (optionValue) {
      updateFieldInFormConfig({
        subTypeOptions: [
          ...(field?.subTypeOptions || []),
          {
            id:
              field?.subTypeOptions?.length > 0
                ? field.subTypeOptions[field.subTypeOptions.length - 1].id + 1
                : 0,
            value: optionValue,
          },
        ],
      });
      setOptionValue("");
    }
  };

  const deleteOption = (id) => {
    updateFieldInFormConfig({
      subTypeOptions: field?.subTypeOptions.filter((opt) => opt.id !== id),
    });
  };

  const editOption = () => {
    updateFieldInFormConfig({
      subTypeOptions: field?.subTypeOptions.map((opt) =>
        opt.id === editOptionId ? { ...opt, value: editOptionValue } : opt
      ),
    });
    setEditOptionId(null);
    setEditOptionValue("");
  };

  const toggleEditOption = (option) => {
    if (editOptionId === option.id) {
      editOption();
    } else {
      setEditOptionId(option.id);
      setEditOptionValue(option.value);
    }
  };

  return (
    <div className="checkbox-type-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label className="input-type-label">Label</label>
          <label style={{ display: "flex", alignItems: "center" }}>
            <input
              onChange={(e) =>
                updateFieldInFormConfig({
                  required: e.target.checked,
                })
              }
              checked={field?.required}
              type="checkbox"
            />
            <label className="input-type-label">Mark as Required</label>
          </label>
        </div>
        <input
          className="checkbox-type-input"
          type="text"
          value={field?.label || ""}
          onChange={(e) =>
            updateFieldInFormConfig({
              label: e.target.value,
            })
          }
          placeholder="Add Field Label"
        />
      </div>

      <div className="checkbox-type-options-container">
        <label className="checkbox-type-label">Options</label>
        <div className="checkbox-type-options-list">
          {field?.subTypeOptions?.map((option) => (
            <div key={option?.id} className="checkbox-type-option-item">
              <input
                disabled
                type={field?.type}
                className="checkbox-type-disabled-input"
                id={option?.id}
                value={option?.value}
              />
              <input
                type="text"
                disabled={editOptionId !== option?.id}
                className="checkbox-type-edit-input"
                onChange={(e) => setEditOptionValue(e.target.value)}
                value={
                  editOptionId === option?.id ? editOptionValue : option?.value
                }
              />
              <div style={{ display: "flex", marginBottom: 5 }}>
                <input
                  onClick={() => toggleEditOption(option)}
                  className="checkbox-type-edit-button"
                  type="button"
                  value={editOptionId === option.id ? "Save" : "Edit"}
                />
                <input
                  onClick={() => deleteOption(option.id)}
                  className="checkbox-type-delete-button"
                  type="button"
                  value="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="checkbox-type-add-option">
        <input
          className="checkbox-type-add-input"
          type="text"
          value={optionValue}
          onChange={(e) => setOptionValue(e.target.value)}
          placeholder="Add Option"
        />
        <input
          onClick={saveOption}
          className="checkbox-type-save-button"
          type="button"
          value="Save Option"
        />
      </div>
    </div>
  );
};

export default CheckBoxType;