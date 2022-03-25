import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import BlogViewPage from "./components/BlogViewPage";
import BlogEditPage from "./components/BlogEditPage";

function App() {
  return (
    <div className="app d-flex flex-column">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog-view/:blogId" element={<BlogViewPage />} />
        <Route path="/blog-create" element={<BlogEditPage type='create'/>} />
        <Route path="/blog-edit/:blogId" element={<BlogEditPage type='edit'/>} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
