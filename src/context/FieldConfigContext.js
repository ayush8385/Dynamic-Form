import { createContext } from "react";

export const FieldConfigContext = createContext({
  fieldConfig: {},
  setFieldConfig: () => {},
});
