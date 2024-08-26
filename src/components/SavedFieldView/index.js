import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { FormConfigContext } from "../../context/FormConfigContext";
import EditIcon from "../../assets/edit.png";

const validateField = (field, value) => {
  let errorMessage = "";

  if (field?.required && (!value || value.length === 0)) {
    errorMessage = "This field is required";
  } else if (field?.minLength && value.length < field.minLength) {
    errorMessage = `Minimum length is ${field.minLength}`;
  } else if (field?.maxLength && value.length > field.maxLength) {
    errorMessage = `Maximum length is ${field.maxLength}`;
  } else if (
    field.type === "input" &&
    field.subType === "email" &&
    !/\S+@\S+\.\S+/.test(value)
  ) {
    errorMessage = "Please enter a valid email address";
  } else if (
    field.type === "input" &&
    field.subType === "number" &&
    isNaN(value)
  ) {
    errorMessage = "Please enter a valid number";
  }

  return {
    error: errorMessage,
    valid: !errorMessage,
  };
};

const validateFile = (file, field) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  const maxSize = (field?.maxFileSize || 10 )* 1024 * 1024;
  let errorMessage = "";
  if (!file) {
    errorMessage = "No file selected";
  }
  if (!allowedTypes.includes(file.type)) {
    errorMessage = "File type not supported";
  }
  if (file.size > maxSize) {
    errorMessage = `File size exceeds ${maxSize / 1024 / 1024} MB`;
  }
  return {
    error: errorMessage,
    valid: !errorMessage,
  };
};

const EditField = ({ fieldId }) => {
  const { formConfig, setFormConfig } = useContext(FormConfigContext);
  const editField = () => {
    setFormConfig((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, isSaved: false } : field
      )
    );
  };
  return (
    <img
      onClick={editField}
      src={EditIcon}
      width={26}
      height={26}
      style={{ marginLeft: 20, alignSelf: "end", marginBottom: 10 }}
    />
  );
};

const FieldInput = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    let validation = validateField(field, value);

    if (field?.subType === "file") {
      const file = e.target.files[0];
      validation = validateFile(file, field);
      value = file?.name;
    }

    setError(validation?.error);

    setFormConfig((prev) =>
      prev?.map((item) =>
        item.id === field.id
          ? {
              ...item,
              value,
              error: validation?.error,
              valid: validation?.valid,
            }
          : item
      )
    );
  };

  return (
    <div className="field-container">
      <label className="field-label">
        {field?.required ? "*" : ""}
        {field.label}
      </label>
      {field?.subType === "file" ? (
        <>
          <input
            className="field-input"
            type={field.subType}
            onChange={handleChange}
            placeholder={field.placeholder}
            accept={
              field.subType === "file"
                ? "image/jpeg,image/png,application/pdf"
                : undefined
            }
          />
          {field?.subType === "file" && (
            <span style={{ fontSize: 14 }}>
              Selected File: {field?.value || ""}
            </span>
          )}
        </>
      ) : (
        <input
          maxLength={field?.maxLength}
          minLength={field?.minLength}
          className="field-input"
          type={field.subType}
          value={field?.value || ""}
          onChange={handleChange}
          placeholder={field.placeholder}
        />
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

const FieldTextarea = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const validation = validateField(field, value);
    setError(validation?.error);

    setFormConfig((prev) =>
      prev.map((item) =>
        item.id === field.id
          ? {
              ...item,
              value,
              error: validation?.error,
              valid: validation?.valid,
            }
          : item
      )
    );
  };

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <textarea
        maxLength={field?.maxLength}
        className="field-textarea"
        rows={5}
        placeholder={field.placeholder}
        value={field?.value || ""}
        onChange={handleChange}
      />
      <span style={{ fontSize: 12, marginTop: 2 }}>
        {field?.value?.length || 0}/{field?.maxLength || 1000}
      </span>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

const FieldSelect = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);
  const [error, setError] = useState("");

  const handleChange = (value) => {
    const validation = validateField(field, value);
    setError(validation?.error);

    setFormConfig((prev) =>
      prev.map((item) =>
        item.id === field.id
          ? {
              ...item,
              value,
              error: validation?.error,
              valid: validation?.valid,
            }
          : item
      )
    );
  };

  useEffect(() => {
    handleChange(field?.subTypeOptions[0]?.value);
  }, [field?.subTypeOptions]);

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <select
        value={field?.value || ""}
        onChange={(e) => handleChange(e.target.value)}
        className="field-select"
      >
        {field?.subTypeOptions?.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

const FieldCheckbox = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);
  const [error, setError] = useState("");

  const handleChange = (optionValue, isChecked) => {
    const oldValues = field?.value || [];

    const newValues = isChecked
      ? [...oldValues, optionValue]
      : oldValues.filter((value) => value !== optionValue);

    const validation = validateField(field, newValues);
    setError(validation?.error);

    setFormConfig((prev) =>
      prev.map((item) =>
        item.id === field.id
          ? {
              ...item,
              value: newValues,
              error: validation?.error,
              valid: validation?.valid,
            }
          : item
      )
    );
  };

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {field?.subTypeOptions?.map((option) => (
          <div key={option.id} className="field-option">
            <input
              type="checkbox"
              className="field-option-input"
              id={option.id}
              value={option.value}
              checked={field?.value?.includes(option.value)}
              onChange={(e) => handleChange(option.value, e.target.checked)}
            />
            <label className="field-option-label">{option.value}</label>
          </div>
        ))}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

const FieldRadio = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);
  const [error, setError] = useState("");

  const handleChange = (optionValue) => {
    const validation = validateField(field, optionValue);
    setError(validation.error);

    setFormConfig((prev) =>
      prev.map((item) =>
        item.id === field.id
          ? {
              ...item,
              value: optionValue,
              error: validation.error,
              valid: validation.valid,
            }
          : item
      )
    );
  };

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {field?.subTypeOptions?.map((option) => (
          <div key={option.id} className="field-option">
            <input
              type="radio"
              className="field-option-input"
              id={option.id}
              value={option.value}
              checked={field?.value === option.value}
              onChange={() => handleChange(option.value)}
            />
            <label className="field-option-label">{option.value}</label>
          </div>
        ))}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

const SavedFieldView = ({ field }) => {
  switch (field.type) {
    case "input":
      return (
        <div style={{ display: "flex" }}>
          <FieldInput field={field} />
          <EditField fieldId={field?.id} />
        </div>
      );
    case "textarea":
      return (
        <div style={{ display: "flex" }}>
          <FieldTextarea field={field} />
          <EditField fieldId={field?.id} />
        </div>
      );
    case "select":
      return (
        <div style={{ display: "flex" }}>
          <FieldSelect field={field} />
          <EditField fieldId={field?.id} />
        </div>
      );
    case "checkbox":
      return (
        <div style={{ display: "flex" }}>
          <FieldCheckbox field={field} />
          <EditField fieldId={field?.id} />
        </div>
      );
    case "radio":
      return (
        <div style={{ display: "flex" }}>
          <FieldRadio field={field} />
          <EditField fieldId={field?.id} />
        </div>
      );
    default:
      return null;
  }
};

export default SavedFieldView;
