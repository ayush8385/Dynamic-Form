import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import { FormContext } from "../../context/FormContext";

const validateField = (field, value) => {
  let errorMessage = "";
  if (field?.required && (!value || value.length===0)) {
    errorMessage = "This field is required";
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
    valid: !errorMessage,
    error: errorMessage,
  };
};

const FieldInput = ({ field }) => {
  const { formFields, setFormFields } = useContext(FormContext);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const validation = validateField(field, value);
    setError(validation?.error);

    setFormFields((prev) =>
      prev.map((item) =>
        item.id === field.id ? { ...item, value, error: validation?.error, valid: validation?.valid } : item
      )
    );
  };

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <input
        className="field-input"
        type={field.subType}
        value={formFields.find((item) => item.id === field.id)?.value || ""}
        onChange={handleChange}
        placeholder={field.placeholder}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};


const FieldTextarea = ({ field }) => {
  const { formFields, setFormFields } = useContext(FormContext);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const validation = validateField(field, value);
    setError(validation?.error);

    setFormFields((prev) =>
      prev.map((item) =>
        item.id === field.id ? { ...item, value, error: validation?.error, valid: validation?.valid } : item
      )
    );
  };

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <textarea
        className="field-textarea"
        rows={5}
        placeholder={field.placeholder}
        value={formFields.find((item) => item.id === field.id)?.value || ""}
        onChange={handleChange}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
};


const FieldSelect = ({ field }) => {
  const { formFields, setFormFields } = useContext(FormContext);
  const [error, setError] = useState("");

  const handleChange = (value) => {
    const validation = validateField(field, value);
    setError(validation?.error);

    setFormFields((prev) =>
      prev.map((item) =>
        item.id === field.id ? { ...item, value, error: validation?.error , valid: validation?.valid } : item
      )
    );
  };

  useEffect(()=> {
    handleChange(field?.subTypeOptions[0]?.value)
  }, [field?.subTypeOptions])

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <select
        value={formFields.find((item) => item.id === field.id)?.value || ""}
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
  const { formFields, setFormFields } = useContext(FormContext);
  const [error, setError] = useState("");

  const handleChange = (optionValue, isChecked) => {
    const updatedValues = formFields.find((item) => item.id === field.id)?.value || [];

    const newValues = isChecked
      ? [...updatedValues, optionValue]
      : updatedValues.filter((value) => value !== optionValue);

    const validation = validateField(field, newValues);
    setError(validation?.error);

    setFormFields((prev) =>
      prev.map((item) =>
        item.id === field.id ? { ...item, value: newValues, error: validation?.error, valid: validation?.valid } : item
      )
    );
  };

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <div>
        {field?.subTypeOptions?.map((option) => (
          <div key={option.id} className="field-option">
            <input
              type="checkbox"
              className="field-option-input"
              id={option.id}
              value={option.value}
              checked={
                formFields.find((item) => item.id === field.id)?.value?.includes(option.value)
              }
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
  const { formFields, setFormFields } = useContext(FormContext);
  const [error, setError] = useState("");

  const handleChange = (optionValue) => {
    const validation = validateField(field, optionValue);
    setError(validation.error);

    setFormFields((prev) =>
      prev.map((item) =>
        item.id === field.id
          ? { ...item, value: optionValue, error: validation.error, valid: validation.valid }
          : item
      )
    );
  };

  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <div>
        {field?.subTypeOptions?.map((option) => (
          <div key={option.id} className="field-option">
            <input
              type="radio"
              className="field-option-input"
              id={option.id}
              value={option.value}
              checked={
                formFields.find((item) => item.id === field.id)?.value ===
                option.value
              }
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
      return <FieldInput field={field} />;
    case "textarea":
      return <FieldTextarea field={field} />;
    case "select":
      return <FieldSelect field={field} />;
    case "checkbox":
      return <FieldCheckbox field={field} />;
    case "radio":
      return <FieldRadio field={field} />;
    default:
      return null;
  }
};

export default SavedFieldView;
