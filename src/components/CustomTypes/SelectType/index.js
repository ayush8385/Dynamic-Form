import { useContext, useState } from "react";
import { FieldConfigContext } from "../../../context/FieldConfigContext";
import "./index.css";

const SelectType = ({field}) => {
  const { fieldConfig, setFieldConfig } = useContext(FieldConfigContext);
  const [optionValue, setOptionValue] = useState("");
  const [showEditOptions, setShowEditOptions] = useState(false);
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
    <div className="select-type-container">
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
          className="select-type-input"
          type="text"
          value={fieldConfig?.label || ""}
          onChange={(e) =>
            setFieldConfig((prev) => ({ ...prev, label: e.target.value }))
          }
          placeholder="Add Field Label"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
        <label className="select-type-label">Options</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <select className="select-type-select" style={{ flex: 1 }}>
            {fieldConfig?.subTypeOptions?.map((option) => (
              <option key={option.id}>{option.value}</option>
            ))}
          </select>
          <input
            onClick={() => setShowEditOptions(!showEditOptions)}
            className="select-type-toggle-button"
            type="button"
            value={showEditOptions ? "Hide Options" : "Edit Options"}
          />
        </div>
      </div>

      {showEditOptions && (
        <div className="select-type-edit-options">
          {fieldConfig?.subTypeOptions?.map((option) => (
            <div key={option.id}>
              <input
                className="select-type-edit-input"
                disabled={editOptionId !== option.id}
                type="text"
                onChange={(e) => setEditOptionValue(e.target.value)}
                value={
                  editOptionId === option.id ? editOptionValue : option.value
                }
              />
              <div style={{ display: "flex", marginBottom: 5 }}>
                <input
                  onClick={() => toggleEditOption(option)}
                  className="select-type-edit-button"
                  type="button"
                  value={editOptionId === option.id ? "Save" : "Edit"}
                />
                <input
                  onClick={() => deleteOption(option.id)}
                  className="select-type-delete-button"
                  type="button"
                  value="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 10, display: "flex" }}>
        <input
          className="select-type-input"
          type="text"
          value={optionValue}
          onChange={(e) => setOptionValue(e.target.value)}
          placeholder="Add Option"
        />
        <input
          onClick={saveOption}
          className="select-type-button"
          type="button"
          value="Save Option"
        />
      </div>
    </div>
  );
};

export default SelectType;
