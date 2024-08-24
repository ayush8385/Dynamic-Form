import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import SavedFieldView from "../SavedFieldView";
import EditFieldView from "../EditFieldView";
import "./index.css";

const AllFields = () => {
  const { formFields, isSaved } = useContext(FormContext);
  const isFormValid = formFields.every(field => field.valid);
  if (formFields.length === 0) {
    return null;
  }

  return (
    <div className="fields-container">
      {formFields.map(({ id, isSaved, ...fieldProps }) => (
        <div className="field-item" key={id}>
          {isSaved ? (
            <SavedFieldView field={{ id, ...fieldProps }} />
          ) : (
            <EditFieldView field={{ id, ...fieldProps }} />
          )}
        </div>
      ))}
      <input
        disabled={!isSaved || !isFormValid}
        type="submit"
        style={{
          width: "40%",
          padding: "12px 20px",
          outline: "none",
          borderRadius: 12,
          fontWeight: "bolder",
          fontSize: 16,
        }}
        value="Submit"
      />
    </div>
  );
};

export default AllFields;
