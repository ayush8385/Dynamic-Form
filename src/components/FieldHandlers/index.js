import { useContext } from "react";
import { FieldConfigContext } from "../../context/FieldConfigContext";
import { FormContext } from "../../context/FormContext";
import { initialFieldConfig } from "../../context/FieldConfigContextProvider";
import "./index.css";

const FieldHandlers = ({ fieldId }) => {
  const { fieldConfig, setFieldConfig } = useContext(FieldConfigContext);
  const { setFormFields, setIsSaved } = useContext(FormContext);

  const insertField = () => {
    if (fieldConfig?.label === "") return;
    if(fieldConfig?.type === "input" && fieldConfig?.subType !== 'file' && fieldConfig?.placeholder === "") return;

    const isSelectableFieldValid =
      ["select", "checkbox", "radio"].includes(fieldConfig?.type) &&
      fieldConfig?.subTypeOptions.length > 0;

    if(!isSelectableFieldValid) return;

    setFormFields((prev) =>
      prev.map((field) =>
        field?.id === fieldId
          ? { ...field, ...fieldConfig, isSaved: true }
          : field
      )
    );
    setIsSaved(true);
    clearStates();
  };

  const removeField = () => {
    setFormFields((prev) => prev.filter((field) => field.id !== fieldId));
    setIsSaved(true);
    clearStates();
  };

  const clearStates = () => {
    setFieldConfig(initialFieldConfig);
  };

  return (
    <div className="field-handlers-container">
      <input
        onClick={removeField}
        type="button"
        className="field-handler-button delete"
        value="Delete"
      />
      <input
        onClick={clearStates}
        type="button"
        className="field-handler-button reset"
        value="Reset"
      />
      <input
        onClick={insertField}
        type="button"
        className="field-handler-button save"
        value="Save"
      />
    </div>
  );
};

export default FieldHandlers;
