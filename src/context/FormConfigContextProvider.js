import { useMemo, useState } from "react";
import { FormConfigContext } from "./FormConfigContext";

const FormConfigContextProvider = ({ children }) => {
  const [formId, setFormId] = useState('');
  const [formConfig, setFormConfig] = useState([]);

  const value = useMemo(
    () => ({ formId, setFormId,formConfig, setFormConfig }),
    [formId, setFormId,formConfig, setFormConfig]
  );
  return (
    <FormConfigContext.Provider value={value}>
      {children}
    </FormConfigContext.Provider>
  );
};

export default FormConfigContextProvider;
