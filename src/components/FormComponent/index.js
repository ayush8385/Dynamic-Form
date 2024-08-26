import { useContext, useEffect, useState } from "react";
import FormView from "../FormView";
import ConfigureView from "../ConfigureView";
import "./index.css";
import { useLocation, useParams } from "react-router-dom";
import { FormConfigContext } from "../../context/FormConfigContext";

const FormComponent = () => {
  const [showFieldConfig, setShowFieldConfig] = useState(false);
  const { setFormId, setFormConfig, setInitialConfig } = useContext(FormConfigContext);

  const {id} = useParams();
  const location = useLocation();
  const { formConfig } = location.state || {};

  useEffect(() => {
    setFormId(id);
    setFormConfig(formConfig);
    setInitialConfig(formConfig)
  }, [id]);

  return (
    <div className={`content ${showFieldConfig ? "spaced" : "centered"}`}>
      <FormView showFieldConfig={() => setShowFieldConfig(true)} />
      {showFieldConfig && (
        <ConfigureView removeFieldConfig={() => setShowFieldConfig(false)} />
      )}
    </div>
  );
};

export default FormComponent;
