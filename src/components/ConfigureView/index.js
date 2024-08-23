import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import { v4 as uuidv4 } from 'uuid';
import { Fields } from "../../utils/constants";
import './index.css';

const ConfigureView = ({ removeFieldConfig }) => {
  const { setFormFields, setIsSaved } = useContext(FormContext);

  const addFormField = (item) => {
    setFormFields((prev) => [...prev, { ...item, id: uuidv4() }]);
    setIsSaved(false);
    removeFieldConfig && removeFieldConfig();
  };

  return (
    <div className="configure-view">
      {Fields.map((field) => (
        <div className="configure-view-section" key={field.id}>
          <p className="configure-view-section-title">{field.name}</p>
          <div className="configure-view-children-container">
            {field.children.map((child) => (
              <div
                key={child}
                onClick={() => addFormField(child)}
                className="configure-view-child"
              >
                <p className="configure-view-child-text">{child.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfigureView;
