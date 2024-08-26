import { useMemo, useState } from "react";
import { FormConfigContext } from "./FormConfigContext";

const FormConfigContextProvider = ({ children }) => {
  const [formId, setFormId] = useState("");
  const [formConfig, setFormConfig] = useState([]);
  const [initialConfig, setInitialConfig] = useState([]);

  const value = useMemo(
    () => ({
      formId,
      setFormId,
      formConfig,
      setFormConfig,
      initialConfig,
      setInitialConfig,
    }),
    [
      formId,
      setFormId,
      formConfig,
      setFormConfig,
      initialConfig,
      setInitialConfig,
    ]
  );
  return (
    <FormConfigContext.Provider value={value}>
      {children}
    </FormConfigContext.Provider>
  );
};

export default FormConfigContextProvider;
