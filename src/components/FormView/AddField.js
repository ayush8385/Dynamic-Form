import './index.css';

const AddField = ({ showFieldConfig }) => {
  const isSaved = true;

  return (
    <div
      onClick={() => isSaved && showFieldConfig(true)}
      className={`add-field-container ${!isSaved ? 'disabled' : ''}`}
    >
      <p className="add-field-text">
        <span className="plus-sign">+</span>Add Field
      </p>
    </div>
  );
};

export default AddField;
