import {
  BrowserRouter
} from "react-router-dom";

import Routes from "./routes";
// import Home from "./components/home";
import './main.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  )
}

