import FieldConfigContextProvider from "../../context/FieldConfigContextProvider";
import CheckBoxType from "../CustomTypes/CheckBoxType";
import InputType from "../CustomTypes/InputType";
import SelectType from "../CustomTypes/SelectType";
import FieldHandlers from "../FieldHandlers";

const EditFieldView = ({ field }) => {
  const renderField = () => {
    switch (field?.type) {
      case "input":
        return <InputType />;
      case "textarea":
        return <InputType />;
      case "select":
        return <SelectType />;
      case "checkbox":
        return <CheckBoxType type={field?.type} />;
      case "radio":
        return <CheckBoxType type={field?.type} />;
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
