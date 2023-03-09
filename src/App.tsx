import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Header, Footer } from "./components";
import { Study, Document, Exercise, Profile, Forum } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Study />} />
          <Route path="/document" element={<Document />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
