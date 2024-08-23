import { useState } from "react";
import FormView from "../FormView";
import ConfigureView from "../ConfigureView";
import "./index.css";

const Home = () => {
  const [showFieldConfig, setShowFieldConfig] = useState(false);
  return (
    <div className="container">
      <h1 className="title">Custom Form Builder</h1>
      <div className={`content ${showFieldConfig ? "spaced" : "centered"}`}>
        <FormView showFieldConfig={() => setShowFieldConfig(true)} />
        {showFieldConfig && (
          <ConfigureView removeFieldConfig={() => setShowFieldConfig(false)} />
        )}
      </div>
    </div>
  );
};

export default Home;
