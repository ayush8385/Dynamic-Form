import Home from "./components/Home";
import FormContextProvider from "./context/FormContextProvider";

function App() {
  return (
    <FormContextProvider>
      <Home/>
    </FormContextProvider>
  );
}

export default App;
