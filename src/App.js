import './App.css';
import {useContext} from "react";
import ApiContext from "./contexts/api-context";
import Body from "./components/body";

function App() {
  const apiUrl = useContext(ApiContext);
  return <ApiContext.Provider value={apiUrl}>
    <Body/>
  </ApiContext.Provider>;
}

export default App;
