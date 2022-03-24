import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import BlogViewPage from "./components/BlogViewPage";

import Header from "./components/Header";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="app d-flex flex-column">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog-view/:blogId" element={<BlogViewPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
