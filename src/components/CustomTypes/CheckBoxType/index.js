import { useContext, useState } from "react";
import { FieldConfigContext } from "../../../context/FieldConfigContext";
import "./index.css";

const CheckBoxType = ({ field }) => {
  const { fieldConfig, setFieldConfig } = useContext(FieldConfigContext);
  const [optionValue, setOptionValue] = useState("");
  const [editOptionId, setEditOptionId] = useState(null);
  const [editOptionValue, setEditOptionValue] = useState("");

  const saveOption = () => {
    if (optionValue) {
      setFieldConfig((prev) => ({
        ...prev,
        subTypeOptions: [
          ...prev?.subTypeOptions,
          {
            id:
              prev?.subTypeOptions?.length > 0
                ? prev?.subTypeOptions[prev?.subTypeOptions.length - 1].id + 1
                : 0,
            value: optionValue,
          },
        ],
      }));
      setOptionValue("");
    }
  };

  const deleteOption = (id) => {
    setFieldConfig((prev) => ({
      ...prev,
      subTypeOptions: prev?.subTypeOptions.filter((opt) => opt.id !== id),
    }));
  };

  const editOption = () => {
    setFieldConfig((prev) => ({
      ...prev,
      subTypeOptions: prev?.subTypeOptions.map((opt) =>
        opt.id === editOptionId ? { ...opt, value: editOptionValue } : opt
      ),
    }));
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
                setFieldConfig((prev) => ({
                  ...prev,
                  required: e.target.checked,
                }))
              }
              checked={fieldConfig?.required}
              type="checkbox"
            />
            <label className="input-type-label">Mark as Required</label>
          </label>
        </div>
        <input
          className="checkbox-type-input"
          type="text"
          value={fieldConfig?.label || ""}
          onChange={(e) =>
            setFieldConfig((prev) => ({ ...prev, label: e.target.value }))
          }
          placeholder="Add Field Label"
        />
      </div>

      <div className="checkbox-type-options-container">
        <label className="checkbox-type-label">Options</label>
        <div className="checkbox-type-options-list">
          {fieldConfig?.subTypeOptions?.map((option) => (
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
