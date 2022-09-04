import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Graphlist from "./components/Graphlist";
import Graphdetails from "./components/Graphdetails";
import Layout from "./components/Layout";
import Creategraph from "./components/Creategraph";

function App() {
  return (
   <div >
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Graphlist />} />
          <Route exact path="/graphdetails/:id" element={<Graphdetails />} />
          <Route path="/creategraph" element={<Creategraph />} />
          
        </Route>
      </Routes>
      <Footer />
      </div>
  );
}
export default App;