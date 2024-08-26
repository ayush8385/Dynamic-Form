import { useContext } from "react";
import "./index.css";
import { FormConfigContext } from "../../context/FormConfigContext";

const FieldHandlers = ({ field }) => {
  const { setFormConfig } = useContext(FormConfigContext);

  const insertField = () => {
    if (!field?.label || field?.label === "") return;
    if (
      field?.type === "input" &&
      field?.subType !== "file" &&
      (!field?.placeholder || field?.placeholder === "")
    )
      return;

    const isSelectableField = ["select", "checkbox", "radio"].includes(
      field?.type
    );

    if (isSelectableField && (field?.subTypeOptions|| []).length === 0) return;

    setFormConfig((prev) =>
      prev.map((item) =>
        item?.id === field?.id ? { ...item, ...field, isSaved: true, valid: field?.required ? false: true } : item
      )
    );
  };

  const removeField = () => {
    setFormConfig((prev) => prev.filter((item) => item.id !== field.id));
  };

  return (
    <div className="field-handlers-container">
      <input
        onClick={removeField}
        type="button"
        className="field-handler-button delete"
        value="Delete"
      />
      {/* <input
        onClick={clearStates}
        type="button"
        className="field-handler-button reset"
        value="Reset"
      /> */}
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
