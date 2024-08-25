import AddField from "./AddField";
import AllFields from "./AllFields";
import "./index.css";

const FormView = ({ showFieldConfig }) => {
  return (
    <div className="form-view-container">
      <AllFields />
      <AddField showFieldConfig={showFieldConfig} />
    </div>
  );
};

export default FormView;
