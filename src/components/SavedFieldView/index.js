import React from "react";
import "./index.css";

const FieldInput = ({ field }) => (
  <div className="field-container">
    <label className="field-label">{field.label}</label>
    <input
      className="field-input"
      type={field.subType}
      placeholder={field.placeholder}
    />
  </div>
);

const FieldTextarea = ({ field }) => (
  <div className="field-container">
    <label className="field-label">{field.label}</label>
    <textarea
      className="field-textarea"
      rows={5}
      placeholder={field.placeholder}
    />
  </div>
);

const FieldSelect = ({ field }) => (
  <div className="field-container">
    <label className="field-label">{field.label}</label>
    <select className="field-select">
      {field?.subTypeOptions?.map((option) => (
        <option key={option.id}>{option.value}</option>
      ))}
    </select>
  </div>
);

const FieldOption = ({ option, type }) => (
  <div className="field-option">
    <input
      type={type}
      className="field-option-input"
      id={option.id}
      value={option.value}
    />
    <label className="field-option-label">{option.value}</label>
  </div>
);

const FieldCheckbox = ({ field }) => (
  <div className="field-container">
    <label className="field-label">{field.label}</label>
    <div>
      {field?.subTypeOptions?.map((option) => (
        <FieldOption key={option.id} option={option} type="checkbox" />
      ))}
    </div>
  </div>
);

const FieldRadio = ({ field }) => (
  <div className="field-container">
    <label className="field-label">{field.label}</label>
    <div>
      {field?.subTypeOptions?.map((option) => (
        <FieldOption key={option.id} option={option} type="radio" />
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
