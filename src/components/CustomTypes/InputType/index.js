import { useContext, useState } from "react";
import { FieldConfigContext } from "../../../context/FieldConfigContext";
import "./index.css";

const InputType = ({field}) => {
  const { fieldConfig, setFieldConfig } = useContext(FieldConfigContext);
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
                setFieldConfig((prev) => ({
                  ...prev,
                  ...field,
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
          className="input-type-input"
          type="text"
          value={fieldConfig?.label || ""}
          onChange={(e) => {
            setFieldConfig((prev) => ({ ...prev,...field, label: e.target.value }));
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
            value={fieldConfig?.placeholder || ""}
            onChange={(e) => {
              setFieldConfig((prev) => ({
                ...prev,
                ...field,
                placeholder: e.target.value,
              }));
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
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 16 }}
          >
            <label className="input-type-label">Max</label>
            <input
              className="input-type-input"
              type="number"
              value={fieldConfig?.maxLength}
              onChange={(e) => {
                setFieldConfig((prev) => ({
                  ...prev,
                  ...field,
                  maxLength: e.target.value,
                }));
                validate(e.target.value, "min length");
              }}
              placeholder="Set Maximum Length"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 16 }}
          >
            <label className="input-type-label">Min</label>
            <input
              className="input-type-input"
              type="number"
              value={fieldConfig?.minLength}
              onChange={(e) => {
                setFieldConfig((prev) => ({
                  ...prev,
                  ...field,
                  minLength: e.target.value,
                }));
                validate(e.target.value, "max length");
              }}
              placeholder="Set Minimum Length"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InputType;
