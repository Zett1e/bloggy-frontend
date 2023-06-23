import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Router />
    </BrowserRouter>
  );
}

export default App;
