import "./App.css";
import React from "react";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Home from "./Components/Home";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import NoteState from "./context/NoteState";
import Alert from "./Components/Alert";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert message="Amazing react course" />
          <div className="container">
            <Switch>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
