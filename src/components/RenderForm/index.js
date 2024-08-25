import EditFieldView from "../EditFieldView";
import SavedFieldView from "../SavedFieldView";

const RenderForm = ({ formConfig }) => {
  if (formConfig.length === 0) return null;
  return formConfig.map(({ id, isSaved, ...fieldProps }) => (
    <div className="field-item" key={id}>
      {isSaved ? (
        <SavedFieldView field={{ id, ...fieldProps }} />
      ) : (
        <EditFieldView field={{ id, ...fieldProps }} />
      )}
    </div>
  ));
};
export default RenderForm;
