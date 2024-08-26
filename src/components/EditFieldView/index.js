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
    <div style={{width:'100%', border: '2px solid black', padding:20, boxSizing:'border-box', borderRadius:12, boxShadow:"inset 20px 20px 40px rgba(0,0,0,0.3)"}}>
        {renderField()}
        <FieldHandlers field={field} />
    </div>
  );
};
export default EditFieldView;
