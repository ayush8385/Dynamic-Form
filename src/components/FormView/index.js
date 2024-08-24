import { useContext, useState } from "react";
import AddField from "./AddField";
import AllFields from "./AllFields";
import './index.css';
import { FormContext } from "../../context/FormContext";

const FormView = ({ showFieldConfig }) => {
  const {formFields} = useContext(FormContext)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const submitForm = (event) => {
    event.preventDefault()
    const isFormValid = formFields.every(field => field.valid);
    if(isFormValid){
      !isSubmitted && localStorage.setItem('formConfigData', JSON.stringify(formFields));
      setIsSubmitted(true)
    }
    else{
      formFields.map((field)=> !field.valid ? {...field, error: "This is Required"} : field)
      console.log("Form validation failed");
    }
  };
  return (
    <div className="form-view-container">
      <form name="customForm" style={{width: '100%'}} onSubmit={submitForm}>
         <AllFields isSubmitted={isSubmitted}/>
      </form>
      <AddField showFieldConfig={showFieldConfig} />
    </div>
  );
};

export default FormView;
