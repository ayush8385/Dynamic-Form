import { useMemo, useState } from "react";
import { FormContext } from "./FormContext";

const FormContextProvider = ({ children }) => {
  const [formFields, setFormFields] = useState([]);
  const [isSaved, setIsSaved] = useState(true);
  const value = useMemo(
    () => ({
      formFields,
      setFormFields,
      isSaved,
      setIsSaved,
    }),
    [formFields, setFormFields, isSaved, setIsSaved]
  );
  return (
    <FormContext.Provider value={value}>{children}</FormContext.Provider>
  );
};

export default FormContextProvider;
