import { useContext, useState } from "react";
import "./index.css";
import RenderForm from "../RenderForm";
import { FormConfigContext } from "../../context/FormConfigContext";
import { useNavigate } from "react-router-dom";

const AllFields = () => {
  const { formId, formConfig } = useContext(FormConfigContext);
  const isFormValid = formConfig.every((field) => field.valid);
  const isAllSaved = formConfig.every((field) => field.isSaved);
  const navigate = useNavigate();

  const submitForm = () => {
    if (isFormValid && isAllSaved) {
      const allForms = localStorage.getItem("formConfigData");
      const parsedForm = JSON.parse(allForms) || [];

      const existingFormIndex = parsedForm.findIndex(
        (form) => form.id === formId
      );
      if (existingFormIndex !== -1) {
        parsedForm[existingFormIndex].formConfig = formConfig;
      } else {
        parsedForm.push({ id: formId, formConfig });
      }
      
      localStorage.setItem("formConfigData", JSON.stringify(parsedForm));
      navigate("/");
    } else {
      formConfig.map((field) =>
        !field.valid ? { ...field, error: "This is Required" } : field
      );
      console.log("Form validation failed");
    }
  };

  const newForm = () => {
    // localStorage.removeItem("formConfigData");
    // setFormFields([]);
  };

  if (formConfig?.length === 0) {
    return null;
  }

  return (
    <div className="fields-container">
      <RenderForm formConfig={formConfig} />
      <input
        disabled={!isAllSaved || !isFormValid}
        type="submit"
        onClick={submitForm}
        style={{
          width: "40%",
          padding: "12px 20px",
          outline: "none",
          borderRadius: 12,
          fontWeight: "bolder",
          fontSize: 16,
        }}
        value={"Submit"}
      />
    </div>
  );
};

export default AllFields;
