import React, { useContext } from "react";
import "./index.css";
import { FormContext } from "../../context/FormContext";

const FieldInput = ({ field }) => {
  const { formFields, setFormFields } = useContext(FormContext);
  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <input
        className="field-input"
        type={field.subType}
        value={formFields.find((item) => item.id === field.id)?.value}
        onChange={(e) =>
          setFormFields((prev) =>
            prev.map((item) =>
              item.id === field.id ? { ...item, value: e.target.value } : item
            )
          )
        }
        placeholder={field.placeholder}
      />
    </div>
  );
};

const FieldTextarea = ({ field }) => {
  const { formFields, setFormFields } = useContext(FormContext);
  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <textarea
        className="field-textarea"
        rows={5}
        placeholder={field.placeholder}
        value={formFields.find((item) => item.id === field.id)?.value}
        onChange={(e) =>
          setFormFields((prev) =>
            prev.map((item) =>
              item.id === field.id ? { ...item, value: e.target.value } : item
            )
          )
        }
      />
    </div>
  );
};

const FieldSelect = ({ field }) => {
  const { formFields, setFormFields } = useContext(FormContext);
  return (
    <div className="field-container">
      <label className="field-label">{field.label}</label>
      <select
        value={formFields.find((item) => item.id === field.id)?.value}
        onChange={(e) =>
          setFormFields((prev) =>
            prev.map((item) =>
              item.id === field.id ? { ...item, value: e.target.value } : item
            )
          )
        }
        className="field-select"
      >
        {field?.subTypeOptions?.map((option) => (
          <option key={option.id}>{option.value}</option>
        ))}
      </select>
    </div>
  );
};

const FieldOption = ({ option, type, field }) => {
  const { formFields, setFormFields } = useContext(FormContext);
  const handleChange = (e) => {
    if (type === "checkbox") {
      const updatedValues =
        formFields.find((item) => item.id === field.id)?.value || [];
      const isChecked = e.target.checked;

      setFormFields((prev) =>
        prev.map((item) =>
          item.id === field.id
            ? {
                ...item,
                value: isChecked
                  ? [...updatedValues, option.value]
                  : updatedValues.filter((value) => value !== option.value),
              }
            : item
        )
      );
    } else if (type === "radio") {
      setFormFields((prev) =>
        prev.map((item) =>
          item.id === field.id ? { ...item, value: option.value } : item
        )
      );
    }
  };

  return (
    <div className="field-option">
      <input
        type={type}
        className="field-option-input"
        id={option.id}
        value={option.value}
        checked={
          type === "checkbox"
            ? formFields
                .find((item) => item.id === field.id)
                ?.value?.includes(option.value)
            : formFields.find((item) => item.id === field.id)?.value ===
              option.value
        }
        onChange={handleChange}
      />
      <label className="field-option-label">{option.value}</label>
    </div>
  );
};

const FieldCheckbox = ({ field }) => (
  <div className="field-container">
    <label className="field-label">{field.label}</label>
    <div>
      {field?.subTypeOptions?.map((option) => (
        <FieldOption
          key={option.id}
          field={field}
          option={option}
          type="checkbox"
        />
      ))}
    </div>
  </div>
);

const FieldRadio = ({ field }) => (
  <div className="field-container">
    <label className="field-label">{field.label}</label>
    <div>
      {field?.subTypeOptions?.map((option) => (
        <FieldOption
          key={option.id}
          field={field}
          option={option}
          type="radio"
        />
      ))}
    </div>
  </div>
);

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
