import { useContext, useEffect, useState } from "react";
import FormView from "../FormView";
import ConfigureView from "../ConfigureView";
import "./index.css";
import { FormContext } from "../../context/FormContext";

const Home = () => {
  const [showFieldConfig, setShowFieldConfig] = useState(false);
  const { setFormFields } = useContext(FormContext)

  useEffect(()=>{
    const savedForm = localStorage.getItem('formConfigData');
    if(savedForm){
      setFormFields(JSON.parse(savedForm))
    }
  },[])

  return (
    <div className="container">
      <h1 className="title">Custom Form Builder</h1>
      <div className={`content ${showFieldConfig ? "spaced" : "centered"}`}>
        <FormView showFieldConfig={() => setShowFieldConfig(true)} />
        {showFieldConfig && (
          <ConfigureView removeFieldConfig={() => setShowFieldConfig(false)} />
        )}
      </div>
    </div>
  );
};

export default Home;
