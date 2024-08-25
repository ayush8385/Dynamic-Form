import { useContext, useState } from "react";
import "./index.css";
import { FormConfigContext } from "../../../context/FormConfigContext";

const SelectType = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);
  const [optionValue, setOptionValue] = useState("");
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [editOptionId, setEditOptionId] = useState(null);
  const [editOptionValue, setEditOptionValue] = useState("");

  const updateFieldInFormConfig = (updatedField) => {
    setFormConfig((prev) =>
      prev.map((item) => (item.id === field.id ? { ...item, ...updatedField } : item))
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
                updateFieldInFormConfig({ required: e.target.checked })
              }
              checked={field?.required}
              type="checkbox"
            />
            <label className="input-type-label">Mark as Required</label>
          </label>
        </div>
        <input
          className="select-type-input"
          type="text"
          value={field?.label || ""}
          onChange={(e) =>
            updateFieldInFormConfig({ label: e.target.value })
          }
          placeholder="Add Field Label"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", marginTop: 20 }}>
        <label className="select-type-label">Options</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <select className="select-type-select" style={{ flex: 1 }}>
            {field?.subTypeOptions?.map((option) => (
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
          {field?.subTypeOptions?.map((option) => (
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