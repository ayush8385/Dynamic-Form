import { useContext, useState } from "react";
import "./index.css";
import { FormConfigContext } from "../../../context/FormConfigContext";

const InputType = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);
  const [showMore, setShowMore] = useState(false);
  const [errors, setErrors] = useState({
    label: "",
    placeholder: "",
  });

  const validate = (value, type) => {
    if (!value) {
      setErrors((prev) => ({ ...prev, [type]: `${type} is required.` }));
    } else {
      setErrors((prev) => ({ ...prev, [type]: "" }));
    }
  };

  const updateFieldInFormConfig = (updatedField) => {
    setFormConfig((prev) =>
      prev.map((item) =>
        item.id === field.id ? { ...item, ...updatedField } : item
      )
    );
  };

  return (
    <div className="input-type-container">
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
              style={{ width: 16, height: 16 }}
            />
            <label className="input-type-label">Mark as Required</label>
          </label>
        </div>
        <input
          className="input-type-input"
          type="text"
          value={field?.label || ""}
          onChange={(e) => {
            updateFieldInFormConfig({ label: e.target.value });
            validate(e.target.value, "label");
          }}
          required
          placeholder="Add Field Label"
        />
        {errors.label && <span className="error">{errors.label}</span>}
      </div>
      {field?.subType !== "file" && (
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 16 }}
        >
          <label className="input-type-label">Placeholder</label>
          <input
            className="input-type-input"
            type="text"
            value={field?.placeholder || ""}
            onChange={(e) => {
              updateFieldInFormConfig({ placeholder: e.target.value });
              validate(e.target.value, "placeholder");
            }}
            placeholder="Add Field Placeholder"
          />
          {errors.placeholder && (
            <span className="error">{errors.placeholder}</span>
          )}
        </div>
      )}
      <p onClick={() => setShowMore(!showMore)} className="input-type-toggle">
        {showMore ? "Hide Options" : "Show Options"}
      </p>
      {showMore && (
        <div>
          {field?.subType === "file" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 16,
              }}
            >
              <label className="input-type-label">Max Size(in MB)</label>
              <input
                className="input-type-input"
                type="number"
                value={field?.maxFileSize || ""}
                onChange={(e) => {
                  updateFieldInFormConfig({ maxFileSize: e.target.value });
                  validate(e.target.value, "max file size");
                }}
                placeholder="Set Maximum Size for File"
              />
            </div>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 16,
                }}
              >
                <label className="input-type-label">Max</label>
                <input
                  className="input-type-input"
                  type="number"
                  value={field?.maxLength || ""}
                  onChange={(e) => {
                    updateFieldInFormConfig({ maxLength: e.target.value });
                    validate(e.target.value, "max length");
                  }}
                  placeholder="Set Maximum Length"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: 16,
                }}
              >
                <label className="input-type-label">Min</label>
                <input
                  className="input-type-input"
                  type="number"
                  value={field?.minLength || ""}
                  onChange={(e) => {
                    updateFieldInFormConfig({ minLength: e.target.value });
                    validate(e.target.value, "min length");
                  }}
                  placeholder="Set Minimum Length"
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InputType;
