import { createContext } from "react";

export const FormContext = createContext({
  formFields: [],
  setFormFields: () => {},
  isSaved: undefined,
  setIsSaved: () => {},
});
