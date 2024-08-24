import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import SavedFieldView from "../SavedFieldView";
import EditFieldView from "../EditFieldView";
import "./index.css";

const AllFields = ({ isSubmitted }) => {
  const { formFields, isSaved, setFormFields } = useContext(FormContext);
  const isFormValid = formFields.every((field) => field.valid);

  const newForm = () => {
    localStorage.removeItem("formConfigData");
    setFormFields([]);
  };

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
          backgroundColor: isSubmitted ? "green" : "white",
          color: isSubmitted ? "white" : "black",
        }}
        value={isSubmitted ? "Submitted" : "Submit"}
      />
      {isSubmitted && (
        <input
          onClick={newForm}
          style={{
            width: "30%",
            textAlign: "center",
            padding: "12px 20px",
            outline: "none",
            borderRadius: 12,
            fontWeight: "bolder",
            fontSize: 16,
            marginTop: 20,
          }}
          value="New Form"
        />
      )}
    </div>
  );
};

export default AllFields;
