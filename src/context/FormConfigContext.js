import { createContext } from "react";

export const FormConfigContext = createContext({
  formId: undefined,
  setFormId: () => {},
  formConfig: {},
  setFormConfig: () => {},
  initialConfig: {},
  setInitialConfig: () => {},
});
