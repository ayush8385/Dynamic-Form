import { useMemo, useState } from "react";
import { FieldConfigContext } from "./FieldConfigContext";

export const initialFieldConfig = {
  label: "",
  placeholder: "",
  subTypeOptions: [],
  required: true,
};
const FieldConfigContextProvider = ({ children }) => {
  const [fieldConfig, setFieldConfig] = useState(initialFieldConfig);

  const value = useMemo(
    () => ({ fieldConfig, setFieldConfig }),
    [fieldConfig, setFieldConfig]
  );
  return (
    <FieldConfigContext.Provider value={value}>
      {children}
    </FieldConfigContext.Provider>
  );
};

export default FieldConfigContextProvider;
