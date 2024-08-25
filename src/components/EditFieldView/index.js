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
    <>
        {renderField()}
        <FieldHandlers field={field} />
    </>
  );
};
export default EditFieldView;
