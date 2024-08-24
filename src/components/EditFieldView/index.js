import FieldConfigContextProvider from "../../context/FieldConfigContextProvider";
import CheckBoxType from "../CustomTypes/CheckBoxType";
import InputType from "../CustomTypes/InputType";
import SelectType from "../CustomTypes/SelectType";
import FieldHandlers from "../FieldHandlers";

const EditFieldView = ({ field }) => {
  const renderField = () => {
    switch (field?.type) {
      case "input":
        return <InputType field={field}/>;
      case "textarea":
        return <InputType field={field}/>;
      case "select":
        return <SelectType field={field}/>;
      case "checkbox":
        return <CheckBoxType field={field} />;
      case "radio":
        return <CheckBoxType field={field} />;
    }
  };

  return (
    <FieldConfigContextProvider>
        {renderField()}
        <FieldHandlers fieldId={field?.id} />
    </FieldConfigContextProvider>
  );
};
export default EditFieldView;
