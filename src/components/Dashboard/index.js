import { useEffect, useState } from "react";
import RenderForm from "../RenderForm";
import "./index.css";
import FormIcon from "../../assets/form-icon.png";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showFormOptionId, setShowFormOptionId] = useState(-1);
  const [allForms, setAllForms] = useState([]);
  const [refetchForms,setRefetchForms] = useState(false);

  useEffect(() => {
    const savedForms = localStorage.getItem("formConfigData");
    if (savedForms) {
      setAllForms(JSON.parse(savedForms));
    }
  }, [refetchForms]);

  const deleteForm = (formId) => {
    localStorage.setItem('formConfigData', JSON.stringify(allForms.filter((form)=> form.id !== formId)));
    setRefetchForms(true);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "90%",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
         <div
        className="form-view-small"
        style={{
          margin: 20,
          backgroundColor: "white",
          position: "relative",
          padding: "20px",
          borderRadius: 20,
          maxHeight: 300,
          overflow: "hidden",
          boxShadow: "10px 10px rgba(0,0,0,0.7)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 200,
        }}
      >
        <img src={FormIcon} />
        <button
          onClick={() =>
            navigate(`/form/${uuidv4()}`, { state: { formConfig: [] } })
          }
          style={{
            borderRadius: 10,
            marginTop: 20,
            padding: 10,
            width: 100,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Build
        </button>
      </div>
      {allForms.map((form, index) => {
        return (
          <div
            key={index}
            className="form-view-small"
            onMouseEnter={() => setShowFormOptionId(form.id)}
            onMouseLeave={() => setShowFormOptionId(-1)}
            style={{
              margin: 20,
              backgroundColor: "white",
              position: "relative",
              padding: "8px 14px",
              borderRadius: 20,
              maxHeight: 300,
              overflow: "hidden",
              boxShadow: "10px 10px rgba(0,0,0,0.7)",
            }}
          >
            <RenderForm formConfig={form?.formConfig} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage:
                  "linear-gradient(to top, rgba(72,128,156,1), rgba(1,156,173,0))",
                opacity: 0.5,
              }}
            />
            {showFormOptionId === form?.id && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage:
                    "linear-gradient(to top, rgba(0,0,0,0.4) 100%, rgba(1,156,173,0))",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() =>
                    navigate(`/form/${form.id}`, { state: { formConfig: form?.formConfig } })
                  }
                  style={{
                    fontSize: 16,
                    padding: 10,
                    width: 100,
                    borderRadius: 10,
                    fontWeight: "bold",
                    backgroundColor: "#7CA982",
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  Open
                </button>
                <button
                onClick={() => deleteForm(form.id)}
                  style={{
                    fontSize: 16,
                    padding: 10,
                    width: 100,
                    borderRadius: 10,
                    fontWeight: "bold",
                    backgroundColor: "rgba(240, 92, 92, 0.8)",
                    color: "white",
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        );
      })}
   
    </div>
  );
};
export default Dashboard;
