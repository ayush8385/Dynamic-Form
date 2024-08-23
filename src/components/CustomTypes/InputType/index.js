import { useContext, useState } from "react";
import { FieldConfigContext } from "../../../context/FieldConfigContext";
import "./index.css";

const InputType = () => {
  const { fieldConfig, setFieldConfig } = useContext(FieldConfigContext);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="input-type-container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label className="input-type-label">Label</label>
        <input
          className="input-type-input"
          type="text"
          value={fieldConfig?.label || ""}
          onChange={(e) =>
            setFieldConfig((prev) => ({ ...prev, label: e.target.value }))
          }
          placeholder="Add Field Label"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
        <label className="input-type-label">Placeholder</label>
        <input
          className="input-type-input"
          type="text"
          value={fieldConfig?.placeholder || ""}
          onChange={(e) =>
            setFieldConfig((prev) => ({ ...prev, placeholder: e.target.value }))
          }
          placeholder="Add Field Placeholder"
        />
      </div>
      <p onClick={() => setShowMore(!showMore)} className="input-type-toggle">
        {showMore ? "Hide Options" : "Show Options"}
      </p>
      {/* {showMore && (
        <div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 16 }}
          >
            <label className="input-type-label">Max</label>
            <input
              className="input-type-input"
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholderValue(e.target.value)}
              placeholder="Set Maximum Length"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 16 }}
          >
            <label className="input-type-label">Min</label>
            <input
              className="input-type-input"
              type="text"
              value={placeholder}
              onChange={(e) => setPlaceholderValue(e.target.value)}
              placeholder="Set Minimum Length"
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default InputType;
