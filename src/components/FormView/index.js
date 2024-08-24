import { useContext } from "react";
import AddField from "./AddField";
import AllFields from "./AllFields";
import './index.css';
import { FormContext } from "../../context/FormContext";

const FormView = ({ showFieldConfig }) => {
  const {formFields} = useContext(FormContext)
  const submitForm = (event) => {
    event.preventDefault()
    const isFormValid = formFields.every(field => field.valid);
    if(isFormValid){
      localStorage.setItem('formConfigData', JSON.stringify(formFields));
    }
    else{
      console.log("Form validation failed");
    }
  };
  return (
    <div className="form-view-container">
      <form name="customForm" style={{width: '100%'}} onSubmit={submitForm}>
         <AllFields />  
      </form>
      <AddField showFieldConfig={showFieldConfig} />
    </div>
  );
};

export default FormView;
